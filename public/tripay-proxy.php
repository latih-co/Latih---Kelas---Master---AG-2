<?php
/**
 * Tripay API Proxy — latih.co
 *
 * Meneruskan request pembuatan transaksi dari Supabase Edge Function ke Tripay API.
 * Diperlukan karena Supabase Edge Functions memiliki IP dinamis yang tidak bisa
 * diwhitelist di Tripay. Rumahweb memiliki IP statis: 203.175.8.170
 *
 * Keamanan: cek X-Proxy-Secret header agar tidak bisa diakses sembarangan.
 */

// ── Rahasia bersama antara Edge Function dan proxy ini ─────────
// Harus sama dengan PROXY_SECRET di Supabase Edge Function Secrets
$PROXY_SECRET = getenv('PROXY_SECRET') ?: 'latih-proxy-2026';

// ── Validasi method ─────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// ── Validasi secret header ──────────────────────────────────────
$headers  = getallheaders();
$secret   = $headers['X-Proxy-Secret'] ?? '';
if ($secret !== $PROXY_SECRET) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden']);
    exit;
}

// ── Ambil body dan target URL dari Edge Function ────────────────
$rawBody    = file_get_contents('php://input');
$payload    = json_decode($rawBody, true);
$tripayUrl  = $payload['tripay_url']  ?? '';
$apiKey     = $payload['api_key']     ?? '';
$requestBody = $payload['body']       ?? '';

if (!$tripayUrl || !$apiKey || !$requestBody) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// ── Teruskan ke Tripay API ──────────────────────────────────────
$ch = curl_init($tripayUrl);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($requestBody),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Proxy curl error: ' . $curlErr]);
    exit;
}

// Kembalikan response Tripay ke Edge Function
http_response_code($httpCode);
header('Content-Type: application/json');
echo $response;

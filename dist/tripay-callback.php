<?php
/**
 * Tripay Callback Proxy — latih.co
 * 
 * Meneruskan notifikasi pembayaran dari Tripay ke Supabase Edge Function.
 * URL ini yang didaftarkan ke Tripay Dashboard sebagai Callback URL:
 *   https://latih.co/tripay-callback.php
 */

$SUPABASE_WEBHOOK_URL = 'https://jngccipqsppugkvgstsq.supabase.co/functions/v1/tripay-webhook';

// Hanya terima POST dari Tripay
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Ambil raw body dan signature dari Tripay
$rawBody  = file_get_contents('php://input');
$headers  = getallheaders();
$signature = $headers['X-Callback-Signature'] ?? '';

if (empty($rawBody)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Empty body']);
    exit;
}

// Teruskan ke Supabase Edge Function
$SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZ2NjaXBxc3BwdWdrdmdzdHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzcxNzMsImV4cCI6MjA5MDQ1MzE3M30.BQ3lV_RNnckgcocMrd5-MXvL2fx4bc2vRO5hYMIzqSw';

$ch = curl_init($SUPABASE_WEBHOOK_URL);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $rawBody,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'X-Callback-Signature: ' . $signature,
        'Authorization: Bearer ' . $SUPABASE_ANON_KEY,
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Proxy error: ' . $curlError]);
    exit;
}

// Kembalikan response dari Supabase ke Tripay
http_response_code($httpCode);
header('Content-Type: application/json');
echo $response;

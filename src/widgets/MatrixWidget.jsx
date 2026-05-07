import { useState } from "react";
import { COLORS } from "../data/courses";

// Interactive Matrix / Table Widget for comparative learning
// Used in Slide 6 "Apa Itu Produk dan Layanan" to compare Quality Control implications
export default function MatrixWidget({ instruction, rows, columns, cells, xp, onComplete, setScore, feedback }) {
  const [openedCells, setOpenedCells] = useState(new Set());
  const [activeCell, setActiveCell]   = useState(null); // { rowId, colId } 

  // Total unique cells to open
  const totalCells = rows.length * columns.length;
  const isAllOpened = openedCells.size >= totalCells;

  const getCellId = (rId, cId) => `${rId}-${cId}`;

  const handleCellClick = (rowId, colId) => {
    const id = getCellId(rowId, colId);
    
    // Set active for detail view
    setActiveCell({ rowId, colId });
    
    // Mark as opened if not already
    if (!openedCells.has(id)) {
      setOpenedCells(prev => new Set([...prev, id]));
      // Give partial XP for each cell discovery
      if (openedCells.size === 0) {
        setScore(s => s + Math.floor(xp * 0.2)); // First cell bonus
      } else if (openedCells.size + 1 === totalCells) {
        setScore(s => s + Math.floor(xp * 0.8)); // Completion bonus
        if (onComplete) {
           // Wait a bit before allowing to proceed
           setTimeout(() => {}, 500);
        }
      }
    }
  };

  const handleDone = () => {
    if (isAllOpened && onComplete) onComplete();
  };

  // Find cell data for current active view
  const activeData = activeCell 
    ? cells.find(c => c.rowId === activeCell.rowId && c.colId === activeCell.colId) 
    : null;
    
  const activeRow = activeCell ? rows.find(r => r.id === activeCell.rowId) : null;
  const activeCol = activeCell ? columns.find(c => c.id === activeCell.colId) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }}>{instruction}</p>

      {/* Progress Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div style={{ flex: 1, height: 6, background: COLORS.lightGray, borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${(openedCells.size / totalCells) * 100}%`,
            background: `linear-gradient(90deg, ${COLORS.plan}, ${COLORS.do})`,
            borderRadius: 99, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }} />
        </div>
        <span style={{ fontSize: 12, color: COLORS.gray, fontWeight: 700, minWidth: 45 }}>
          {openedCells.size} / {totalCells}
        </span>
      </div>

      {/* Matrix Table Container  */}
      <div style={{ 
        overflowX: "auto", 
        background: "#fff", 
        borderRadius: 16, 
        border: `1px solid ${COLORS.lightGray}`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
      }}>
        <div style={{ minWidth: "max-content", display: "flex", flexDirection: "column" }}>
          
          {/* Header Row */}
          <div style={{ display: "flex", borderBottom: `2px solid ${COLORS.lightGray}` }}>
            {/* Top Left Empty Cell */}
            <div style={{ width: 100, flexShrink: 0, padding: 12, background: "#f8f9fa" }}></div>
            
            {/* Column Headers */}
            {columns.map(col => (
              <div key={col.id} style={{ 
                flex: 1, minWidth: 120, padding: "12px 8px", 
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                background: "#f8f9fa"
              }}>
                <span style={{ fontSize: 20 }}>{col.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: COLORS.dark, textAlign: "center", textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {col.label}
                </span>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map((row, rIdx) => (
            <div key={row.id} style={{ 
              display: "flex", 
              borderBottom: rIdx < rows.length - 1 ? `1px solid ${COLORS.lightGray}` : "none" 
            }}>
              
              {/* Row Header */}
              <div style={{ 
                width: 100, flexShrink: 0, padding: "12px 8px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
                background: `${row.color}08`, borderRight: `2px solid ${COLORS.lightGray}`
              }}>
                <span style={{ fontSize: 24 }}>{row.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: row.color, textAlign: "center", lineHeight: 1.2 }}>
                  {row.label}
                </span>
              </div>

              {/* Cells */}
              {columns.map(col => {
                const isOpened = openedCells.has(getCellId(row.id, col.id));
                const isActive = activeCell?.rowId === row.id && activeCell?.colId === col.id;
                const cellData = cells.find(c => c.rowId === row.id && c.colId === col.id);
                
                return (
                  <div 
                    key={col.id}
                    onClick={() => handleCellClick(row.id, col.id)}
                    style={{
                      flex: 1, minWidth: 120, padding: 10,
                      borderRight: `1px solid ${COLORS.lightGray}60`,
                      background: isActive ? `${row.color}15` : isOpened ? "#fff" : "#f1f3f5",
                      cursor: "pointer",
                      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                      transition: "all 0.2s",
                      position: "relative",
                      minHeight: 80
                    }}
                  >
                    {!isOpened ? (
                      // Unopened state
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: `${COLORS.gray}20`, color: COLORS.gray,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, fontWeight: 900
                      }}>?</div>
                    ) : (
                      // Opened state
                      <p style={{ 
                        fontSize: 11, color: isActive ? COLORS.dark : COLORS.gray, 
                        textAlign: "center", lineHeight: 1.4, fontWeight: isActive ? 600 : 400
                      }}>
                        {cellData?.preview || "..."}
                      </p>
                    )}
                    
                    {/* Active highlight border */}
                    {isActive && (
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                        border: `2px solid ${row.color}`, pointerEvents: "none"
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel for Active Cell */}
      {activeCell && activeData && (
        <div style={{
          background: `${activeRow.color}08`, 
          border: `2px solid ${activeRow.color}30`,
          borderRadius: 16, padding: "16px 20px",
          display: "flex", flexDirection: "column", gap: 10,
          animation: "slideUp 0.3s ease-out",
          marginTop: 8
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>{activeCol.icon}</span>
            <p style={{ fontSize: 12, fontWeight: 800, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 1 }}>
              {activeRow.label} <span style={{ color: COLORS.lightGray, margin: "0 4px" }}>•</span> {activeCol.label}
            </p>
          </div>
          <p style={{ fontSize: 14, color: COLORS.dark, lineHeight: 1.6 }}>
            {activeData.detail}
          </p>
        </div>
      )}

      {/* Action Button */}
      <button className="action-btn"
        onClick={isAllOpened ? handleDone : undefined}
        disabled={!isAllOpened}
        style={{
          padding: "16px 0", borderRadius: 16,
          background: isAllOpened ? COLORS.dark : COLORS.lightGray,
          color: isAllOpened ? "#fff" : COLORS.gray,
          border: "none", fontWeight: 800, fontSize: 16,
          cursor: isAllOpened ? "pointer" : "not-allowed",
          width: "100%", marginTop: 10,
          transition: "all 0.3s"
        }}
      >
        {isAllOpened ? (feedback?.next || "Lanjut →") : `Buka ${totalCells - openedCells.size} sel lagi`}
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}

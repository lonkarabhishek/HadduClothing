"use client";

import { X, Ruler } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isKids?: boolean;
};

const ADULT_SIZE_CHART = [
  { size: "S", chest: "34-36", length: "27", shoulder: "17" },
  { size: "M", chest: "38-40", length: "28", shoulder: "18" },
  { size: "L", chest: "40-42", length: "29", shoulder: "19" },
  { size: "XL", chest: "42-44", length: "30", shoulder: "20" },
  { size: "XXL", chest: "44-46", length: "31", shoulder: "21" },
  { size: "3XL", chest: "46-48", length: "32", shoulder: "22" },
];

const KIDS_SIZE_CHART = [
  { size: "S", age: "3-4 yrs", height: "98-104", chest: "21-22", length: "16" },
  { size: "M", age: "5-6 yrs", height: "110-116", chest: "23-24", length: "18" },
  { size: "L", age: "7-8 yrs", height: "122-128", chest: "25-26", length: "20" },
  { size: "XL", age: "9-10 yrs", height: "134-140", chest: "27-28", length: "22" },
  { size: "XXL", age: "11-12 yrs", height: "146-152", chest: "29-30", length: "24" },
];

export default function SizeGuide({ isOpen, onClose, isKids = false }: Props) {
  const [showKids, setShowKids] = useState(isKids);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Sync with prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowKids(isKids);
    }
  }, [isOpen, isKids]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 50,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '520px',
        maxHeight: '90vh',
        backgroundColor: 'white',
        borderRadius: '16px',
        zIndex: 50,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #e5e5e5',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#3f5046',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ruler size={18} color="white" />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111' }}>Size Guide</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#f3f4f6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close"
          >
            <X size={20} color="#666" />
          </button>
        </div>

        {/* Toggle */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <button
            onClick={() => setShowKids(false)}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: !showKids ? '#3f5046' : '#f3f4f6',
              color: !showKids ? 'white' : '#666',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Adults
          </button>
          <button
            onClick={() => setShowKids(true)}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: showKids ? '#f59e0b' : '#f3f4f6',
              color: showKids ? 'white' : '#666',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Kids
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Size Chart */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#111',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: showKids ? '#fef3c7' : '#ecfdf5',
                color: showKids ? '#92400e' : '#065f46',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: '20px'
              }}>1</span>
              Size Chart {showKids ? '(cm)' : '(inches)'}
            </h3>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ overflowX: 'auto' }}>
                {showKids ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#fef3c7' }}>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#92400e', borderBottom: '1px solid #fcd34d' }}>Size</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#92400e', borderBottom: '1px solid #fcd34d' }}>Age</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#92400e', borderBottom: '1px solid #fcd34d' }}>Height</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#92400e', borderBottom: '1px solid #fcd34d' }}>Chest</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#92400e', borderBottom: '1px solid #fcd34d' }}>Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {KIDS_SIZE_CHART.map((row, i) => (
                        <tr key={row.size} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fffbeb' }}>
                          <td style={{ padding: '10px', fontWeight: '600', color: '#111', borderBottom: '1px solid #f0f0f0' }}>{row.size}</td>
                          <td style={{ padding: '10px', color: '#666', borderBottom: '1px solid #f0f0f0' }}>{row.age}</td>
                          <td style={{ padding: '10px', color: '#666', borderBottom: '1px solid #f0f0f0' }}>{row.height} cm</td>
                          <td style={{ padding: '10px', color: '#666', borderBottom: '1px solid #f0f0f0' }}>{row.chest}"</td>
                          <td style={{ padding: '10px', color: '#666', borderBottom: '1px solid #f0f0f0' }}>{row.length}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#ecfdf5' }}>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#065f46', borderBottom: '1px solid #a7f3d0' }}>Size</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#065f46', borderBottom: '1px solid #a7f3d0' }}>Chest</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#065f46', borderBottom: '1px solid #a7f3d0' }}>Length</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '600', color: '#065f46', borderBottom: '1px solid #a7f3d0' }}>Shoulder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ADULT_SIZE_CHART.map((row, i) => (
                        <tr key={row.size} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f0fdf4' }}>
                          <td style={{ padding: '10px', fontWeight: '600', color: '#111', borderBottom: '1px solid #f0f0f0' }}>{row.size}</td>
                          <td style={{ padding: '10px', color: '#666', borderBottom: '1px solid #f0f0f0' }}>{row.chest}"</td>
                          <td style={{ padding: '10px', color: '#666', borderBottom: '1px solid #f0f0f0' }}>{row.length}"</td>
                          <td style={{ padding: '10px', color: '#666', borderBottom: '1px solid #f0f0f0' }}>{row.shoulder}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* How to Measure */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#111',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: showKids ? '#fef3c7' : '#ecfdf5',
                color: showKids ? '#92400e' : '#065f46',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: '20px'
              }}>2</span>
              How to Measure
            </h3>
            <div style={{
              backgroundColor: '#f9fafb',
              borderRadius: '12px',
              padding: '16px'
            }}>
              {showKids ? (
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                  <li><strong>Height:</strong> Stand your child against a wall and measure from floor to top of head.</li>
                  <li><strong>Chest:</strong> Measure around the fullest part of the chest under the arms.</li>
                  <li><strong>Length:</strong> Measure from shoulder to desired hem length.</li>
                </ul>
              ) : (
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                  <li><strong>Chest:</strong> Measure around the fullest part of your chest.</li>
                  <li><strong>Length:</strong> Measure from shoulder to bottom hem.</li>
                  <li><strong>Shoulder:</strong> Measure from shoulder seam to seam across the back.</li>
                </ul>
              )}
            </div>
          </div>

          {/* Fit Notes */}
          <div style={{
            backgroundColor: showKids ? '#fef3c7' : '#ecfdf5',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: showKids ? '#92400e' : '#065f46',
              marginBottom: '8px'
            }}>
              {showKids ? '👶 Kids Fit Notes' : 'Fit Notes'}
            </h3>
            {showKids ? (
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: showKids ? '#78350f' : '#047857', lineHeight: '1.7' }}>
                <li>Sizes are based on age and height for best fit</li>
                <li>If between sizes, we recommend sizing up</li>
                <li>Comfortable, relaxed fit for active play</li>
                <li>Pre-washed fabric with minimal shrinkage</li>
              </ul>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#047857', lineHeight: '1.7' }}>
                <li>Our pieces have a relaxed, oversized fit</li>
                <li>For a fitted look, size down</li>
                <li>Model is 5&apos;11&quot; wearing size M</li>
              </ul>
            )}
          </div>

          {/* Contact */}
          <p style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
            Need help? <a href="/contact" style={{ color: '#3f5046', fontWeight: '600' }}>Contact us</a>
          </p>
        </div>
      </div>
    </>
  );
}

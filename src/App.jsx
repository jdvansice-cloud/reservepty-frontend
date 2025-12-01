import React, { useState, useEffect } from 'react';

// Initial Data - will be stateful
const INITIAL_USER = {
  id: 1,
  name: 'Carlos Mendoza',
  email: 'carlos@family.com',
  tier: 1,
  avatar: 'CM',
  family: 'Mendoza Family Trust'
};

const INITIAL_ASSETS = [
  {
    id: 1,
    type: 'plane',
    name: 'Citation CJ4',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800',
    location: 'PTY - Tocumen Intl',
    status: 'available',
    specs: { cruiseSpeed: 451, range: '2,165 nm', passengers: 8 },
    nextMaintenance: '2024-02-15'
  },
  {
    id: 2,
    type: 'boat',
    name: 'Azimut 55',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
    location: 'Flamenco Marina',
    status: 'available',
    specs: { length: '55 ft', engineHours: 342, passengers: 12 },
    nextMaintenance: '2024-03-01'
  },
  {
    id: 3,
    type: 'home',
    name: 'Boquete Mountain Retreat',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
    location: 'Boquete, Chiriquí',
    status: 'occupied',
    specs: { bedrooms: 5, bathrooms: 4, sqft: '4,200' },
    occupiedBy: 'Maria Mendoza',
    occupiedUntil: '2024-01-20'
  },
  {
    id: 4,
    type: 'home',
    name: 'Bocas Beach Villa',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
    location: 'Bocas del Toro',
    status: 'available',
    specs: { bedrooms: 4, bathrooms: 3, sqft: '3,100' }
  },
  {
    id: 5,
    type: 'vehicle',
    name: 'Range Rover Autobiography',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    location: 'Punta Pacifica Garage',
    status: 'available',
    specs: { year: 2024, seats: 5, fuel: 'Full' }
  }
];

const INITIAL_RESERVATIONS = [
  { id: 1, assetId: 3, assetName: 'Boquete Mountain Retreat', user: 'Maria Mendoza', start: '2024-01-15', end: '2024-01-20', status: 'active' },
  { id: 2, assetId: 1, assetName: 'Citation CJ4', user: 'Carlos Mendoza', start: '2024-01-25', end: '2024-01-25', status: 'upcoming', route: 'PTY → SJO' },
  { id: 3, assetId: 2, assetName: 'Azimut 55', user: 'Ana Mendoza', start: '2024-02-01', end: '2024-02-03', status: 'upcoming' }
];

const INITIAL_AIRPORTS = [
  { id: 1, code: 'PTY', name: 'Tocumen International', city: 'Panama City', country: 'Panama' },
  { id: 2, code: 'SJO', name: 'Juan Santamaría', city: 'San José', country: 'Costa Rica' },
  { id: 3, code: 'BOG', name: 'El Dorado', city: 'Bogotá', country: 'Colombia' },
  { id: 4, code: 'MDE', name: 'José María Córdova', city: 'Medellín', country: 'Colombia' },
  { id: 5, code: 'CTG', name: 'Rafael Núñez', city: 'Cartagena', country: 'Colombia' },
  { id: 6, code: 'MIA', name: 'Miami International', city: 'Miami', country: 'USA' }
];

const INITIAL_PORTS = [
  { id: 1, code: 'FLM', name: 'Flamenco Marina', city: 'Panama City', country: 'Panama' },
  { id: 2, code: 'BLB', name: 'Balboa Yacht Club', city: 'Panama City', country: 'Panama' },
  { id: 3, code: 'SBM', name: 'Shelter Bay Marina', city: 'Colón', country: 'Panama' },
  { id: 4, code: 'BDT', name: 'Bocas Marina', city: 'Bocas del Toro', country: 'Panama' }
];

const INITIAL_MEMBERS = [
  { id: 1, name: 'Carlos Mendoza', email: 'carlos@mendoza.family', tier: 1, role: 'Family Head' },
  { id: 2, name: 'Maria Mendoza', email: 'maria@mendoza.family', tier: 2, role: 'Spouse' },
  { id: 3, name: 'Ana Mendoza', email: 'ana@mendoza.family', tier: 3, role: 'Daughter' },
  { id: 4, name: 'Juan Mendoza', email: 'juan@mendoza.family', tier: 4, role: 'Son' }
];

// Icons
const Icons = {
  plane: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.21v-4.32a2 2 0 0 0-1.3-1.87l-6.7-2.51V4a2 2 0 0 0-4 0v3.51l-6.7 2.51A2 2 0 0 0 2 11.89v4.32l8-2.5V18l-2 1.5V21l3-1 3 1v-1.5L12 18v-4.29z"/>
    </svg>
  ),
  boat: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/>
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
      <path d="M12 10v4"/>
    </svg>
  ),
  home: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  vehicle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-3-5H9L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  ),
  calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1"/>
      <rect width="7" height="5" x="14" y="3" rx="1"/>
      <rect width="7" height="9" x="14" y="12" rx="1"/>
      <rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  ),
  settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  logout: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  chevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  x: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  mapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  anchor: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
    </svg>
  )
};

// Styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap');
  
  :root {
    --navy: #0a1628;
    --navy-light: #162236;
    --navy-medium: #1e3a5f;
    --gold: #c9a962;
    --gold-light: #e8d5a3;
    --cream: #faf8f5;
    --cream-dark: #f0ebe3;
    --slate: #64748b;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Outfit', sans-serif;
    background: var(--cream);
    color: var(--navy);
    line-height: 1.6;
    overflow-x: hidden;
  }
  
  .font-display {
    font-family: 'Cormorant Garamond', serif;
  }
  
  /* Landing Page */
  .landing {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 50%, var(--navy-medium) 100%);
    position: relative;
    overflow: hidden;
  }
  
  .landing::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(201, 169, 98, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(201, 169, 98, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .landing-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 4rem;
    position: relative;
    z-index: 10;
  }
  
  .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--cream);
    letter-spacing: 0.05em;
  }
  
  .logo span {
    color: var(--gold);
  }
  
  .nav-links {
    display: flex;
    gap: 3rem;
    list-style: none;
  }
  
  .nav-links a {
    color: var(--cream);
    text-decoration: none;
    font-weight: 400;
    font-size: 0.95rem;
    letter-spacing: 0.03em;
    opacity: 0.8;
    transition: opacity 0.3s, color 0.3s;
  }
  
  .nav-links a:hover {
    opacity: 1;
    color: var(--gold);
  }
  
  .landing-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 120px);
    text-align: center;
    padding: 2rem;
    position: relative;
    z-index: 10;
  }
  
  .hero-tagline {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--gold);
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 400;
    color: var(--cream);
    line-height: 1.1;
    margin-bottom: 1.5rem;
    max-width: 900px;
  }
  
  .hero-title em {
    font-style: italic;
    color: var(--gold);
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
    color: rgba(250, 248, 245, 0.7);
    max-width: 500px;
    margin-bottom: 3rem;
    font-weight: 300;
  }
  
  .hero-buttons {
    display: flex;
    gap: 1.5rem;
  }
  
  .btn {
    padding: 1rem 2.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    border: none;
    font-family: 'Outfit', sans-serif;
  }
  
  .btn-primary {
    background: var(--gold);
    color: var(--navy);
  }
  
  .btn-primary:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(201, 169, 98, 0.4);
  }
  
  .btn-secondary {
    background: transparent;
    color: var(--cream);
    border: 1px solid rgba(250, 248, 245, 0.3);
  }
  
  .btn-secondary:hover {
    background: rgba(250, 248, 245, 0.1);
    border-color: rgba(250, 248, 245, 0.5);
  }
  
  .btn-danger {
    background: var(--danger);
    color: white;
  }
  
  .btn-danger:hover {
    background: #dc2626;
  }
  
  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .btn-icon {
    padding: 0.5rem;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn-icon svg {
    width: 18px;
    height: 18px;
  }
  
  /* Features */
  .features {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 4rem;
    position: relative;
    z-index: 10;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s;
  }
  
  .feature-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-4px);
  }
  
  .feature-icon {
    width: 48px;
    height: 48px;
    color: var(--gold);
    margin: 0 auto 1rem;
  }
  
  .feature-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    color: var(--cream);
    margin-bottom: 0.5rem;
  }
  
  .feature-desc {
    font-size: 0.85rem;
    color: rgba(250, 248, 245, 0.6);
    font-weight: 300;
  }
  
  /* Auth Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 22, 40, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .modal {
    background: var(--cream);
    border-radius: 12px;
    padding: 3rem;
    width: 100%;
    max-width: 420px;
    position: relative;
    animation: slideUp 0.4s ease;
  }
  
  .modal-lg {
    max-width: 800px;
  }
  
  .modal-xl {
    max-width: 1000px;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    border: none;
    background: var(--cream-dark);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--slate);
    transition: all 0.3s;
  }
  
  .modal-close:hover {
    background: var(--navy);
    color: var(--cream);
  }
  
  .modal-close svg {
    width: 16px;
    height: 16px;
  }
  
  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--navy);
  }
  
  .modal-subtitle {
    color: var(--slate);
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--navy);
  }
  
  .form-input, .form-select, .form-textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
    border: 1px solid var(--cream-dark);
    border-radius: 6px;
    background: white;
    color: var(--navy);
    transition: border-color 0.3s, box-shadow 0.3s;
    font-family: 'Outfit', sans-serif;
  }
  
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.1);
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .form-row-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .form-actions .btn {
    flex: 1;
  }
  
  .auth-toggle {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: var(--slate);
  }
  
  .auth-toggle button {
    background: none;
    border: none;
    color: var(--gold);
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
  }
  
  /* Dashboard Layout */
  .dashboard {
    display: flex;
    min-height: 100vh;
  }
  
  .sidebar {
    width: 280px;
    background: var(--navy);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 50;
  }
  
  .sidebar-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--cream);
    margin-bottom: 3rem;
    letter-spacing: 0.03em;
  }
  
  .sidebar-logo span {
    color: var(--gold);
  }
  
  .sidebar-section {
    margin-bottom: 2rem;
  }
  
  .sidebar-title {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--slate);
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
  
  .sidebar-nav {
    list-style: none;
  }
  
  .sidebar-item {
    margin-bottom: 0.25rem;
  }
  
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: rgba(250, 248, 245, 0.7);
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.3s;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: 'Outfit', sans-serif;
  }
  
  .sidebar-link:hover {
    background: var(--navy-light);
    color: var(--cream);
  }
  
  .sidebar-link.active {
    background: var(--navy-light);
    color: var(--gold);
    border-left: 3px solid var(--gold);
    margin-left: -3px;
  }
  
  .sidebar-link svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  .sidebar-footer {
    margin-top: auto;
    padding-top: 2rem;
    border-top: 1px solid var(--navy-light);
  }
  
  .user-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gold);
    color: var(--navy);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .user-info {
    flex: 1;
  }
  
  .user-name {
    color: var(--cream);
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  .user-tier {
    font-size: 0.75rem;
    color: var(--gold);
  }
  
  /* Main Content */
  .main-content {
    flex: 1;
    margin-left: 280px;
    min-height: 100vh;
  }
  
  .content-header {
    background: white;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 40;
    border-bottom: 1px solid var(--cream-dark);
  }
  
  .page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.75rem;
    font-weight: 500;
  }
  
  .content-body {
    padding: 2rem;
  }
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: var(--slate);
    margin-bottom: 0.5rem;
  }
  
  .stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--navy);
    line-height: 1;
    margin-bottom: 0.25rem;
  }
  
  .stat-change {
    font-size: 0.8rem;
    color: var(--success);
  }
  
  /* Section Headers */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  
  .section-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--gold);
    font-size: 0.9rem;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
  }
  
  .section-link svg {
    width: 16px;
    height: 16px;
  }
  
  /* Assets Grid */
  .assets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  
  .asset-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }
  
  .asset-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
  
  .asset-image {
    height: 200px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .asset-type-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--navy);
    color: var(--cream);
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: capitalize;
  }
  
  .asset-type-badge svg {
    width: 14px;
    height: 14px;
  }
  
  .asset-status {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .asset-status.available {
    background: var(--success);
    color: white;
  }
  
  .asset-status.occupied {
    background: var(--warning);
    color: white;
  }
  
  .asset-details {
    padding: 1.5rem;
  }
  
  .asset-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .asset-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--slate);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .asset-location svg {
    width: 16px;
    height: 16px;
  }
  
  .asset-specs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  
  .spec-item {
    text-align: center;
    padding: 0.5rem;
    background: var(--cream);
    border-radius: 4px;
  }
  
  .spec-value {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--navy);
  }
  
  .spec-label {
    font-size: 0.7rem;
    color: var(--slate);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* Reservations */
  .reservations-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .reservation-card {
    background: white;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .reservation-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--navy);
  }
  
  .reservation-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .reservation-info {
    flex: 1;
  }
  
  .reservation-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .reservation-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--slate);
    font-size: 0.85rem;
  }
  
  .reservation-dates {
    text-align: right;
  }
  
  .reservation-date {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
  
  .reservation-status {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    text-transform: capitalize;
  }
  
  .reservation-status.active {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
  }
  
  .reservation-status.upcoming {
    background: rgba(201, 169, 98, 0.1);
    color: var(--gold);
  }
  
  /* Calendar */
  .calendar-container {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .calendar-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
  }
  
  .calendar-nav {
    display: flex;
    gap: 0.5rem;
  }
  
  .calendar-nav button {
    width: 32px;
    height: 32px;
    border: 1px solid var(--cream-dark);
    background: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .calendar-nav button:hover {
    background: var(--cream);
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: var(--cream-dark);
    border: 1px solid var(--cream-dark);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .calendar-day-header {
    background: var(--cream);
    padding: 0.75rem;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--slate);
  }
  
  .calendar-day {
    background: white;
    min-height: 120px;
    padding: 0.5rem;
    position: relative;
  }
  
  .calendar-day.other-month {
    background: var(--cream);
    opacity: 0.5;
  }
  
  .day-number {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--navy);
  }
  
  .calendar-event {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .calendar-event.home {
    background: rgba(16, 185, 129, 0.2);
    color: var(--success);
  }
  
  .calendar-event.plane {
    background: rgba(59, 130, 246, 0.2);
    color: #3b82f6;
  }
  
  .calendar-event.boat {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
  }
  
  /* Booking Modal */
  .booking-modal {
    max-width: 600px;
    width: 100%;
  }
  
  .booking-header {
    background: var(--navy);
    margin: -3rem -3rem 2rem -3rem;
    padding: 2rem 3rem;
    color: var(--cream);
  }
  
  .booking-header .asset-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--gold);
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }
  
  .booking-header .asset-type svg {
    width: 16px;
    height: 16px;
  }
  
  .booking-header h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 500;
  }
  
  .booking-steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .booking-steps::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--cream-dark);
  }
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    z-index: 1;
  }
  
  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--cream-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--slate);
  }
  
  .step.active .step-number {
    background: var(--gold);
    color: var(--navy);
  }
  
  .step.completed .step-number {
    background: var(--success);
    color: white;
  }
  
  .step-label {
    font-size: 0.75rem;
    color: var(--slate);
  }
  
  .step.active .step-label {
    color: var(--navy);
    font-weight: 500;
  }
  
  .booking-content {
    min-height: 200px;
  }
  
  .airport-select {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .airport-select .form-group {
    flex: 1;
    margin-bottom: 0;
  }
  
  .airport-arrow {
    color: var(--gold);
    font-size: 1.5rem;
    font-weight: 300;
  }
  
  .flight-summary {
    background: var(--cream);
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .route-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }
  
  .route-point {
    text-align: center;
  }
  
  .route-code {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--navy);
  }
  
  .route-city {
    font-size: 0.85rem;
    color: var(--slate);
  }
  
  .route-arrow {
    color: var(--gold);
    font-size: 2rem;
  }
  
  .flight-details {
    display: flex;
    justify-content: center;
    gap: 3rem;
    font-size: 0.85rem;
    color: var(--slate);
  }
  
  .booking-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--cream-dark);
  }
  
  .confirmation {
    text-align: center;
    padding: 2rem 0;
  }
  
  .confirmation-icon {
    width: 80px;
    height: 80px;
    background: var(--success);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    animation: scaleIn 0.5s ease;
  }
  
  .confirmation-icon svg {
    width: 40px;
    height: 40px;
  }
  
  @keyframes scaleIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
  
  .confirmation-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .confirmation-message {
    color: var(--slate);
  }
  
  /* Settings Page */
  .settings-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--cream-dark);
    padding-bottom: 1rem;
  }
  
  .settings-tab {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    background: none;
    border: none;
    color: var(--slate);
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.3s;
    font-family: 'Outfit', sans-serif;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .settings-tab svg {
    width: 18px;
    height: 18px;
  }
  
  .settings-tab:hover {
    background: var(--cream-dark);
    color: var(--navy);
  }
  
  .settings-tab.active {
    background: var(--gold);
    color: var(--navy);
  }
  
  /* Data Table */
  .data-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .data-table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--cream);
    border-bottom: 1px solid var(--cream-dark);
  }
  
  .data-table-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 500;
  }
  
  .table-wrapper {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 1rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid var(--cream-dark);
  }
  
  th {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--slate);
    background: var(--cream);
  }
  
  td {
    font-size: 0.9rem;
  }
  
  tr:hover td {
    background: var(--cream);
  }
  
  .table-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .table-actions button {
    padding: 0.4rem;
    border: none;
    background: var(--cream);
    border-radius: 4px;
    cursor: pointer;
    color: var(--slate);
    transition: all 0.3s;
  }
  
  .table-actions button:hover {
    background: var(--navy);
    color: var(--cream);
  }
  
  .table-actions button.danger:hover {
    background: var(--danger);
    color: white;
  }
  
  .table-actions button svg {
    width: 16px;
    height: 16px;
  }
  
  .tier-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .tier-badge.tier-1 {
    background: var(--gold);
    color: var(--navy);
  }
  
  .tier-badge.tier-2 {
    background: #c0c0c0;
    color: var(--navy);
  }
  
  .tier-badge.tier-3 {
    background: #cd7f32;
    color: white;
  }
  
  .tier-badge.tier-4 {
    background: var(--slate);
    color: white;
  }
  
  .type-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.8rem;
    text-transform: capitalize;
    background: var(--cream);
  }
  
  .type-badge svg {
    width: 14px;
    height: 14px;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--slate);
  }
  
  .empty-state svg {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  /* Responsive */
  @media (max-width: 1200px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .features {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
    
    .main-content {
      margin-left: 0;
    }
    
    .landing-nav {
      padding: 1.5rem 2rem;
    }
    
    .nav-links {
      display: none;
    }
    
    .features {
      grid-template-columns: 1fr;
      padding: 2rem;
    }
    
    .hero-buttons {
      flex-direction: column;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .form-row, .form-row-3 {
      grid-template-columns: 1fr;
    }
    
    .settings-tabs {
      flex-wrap: wrap;
    }
  }
`;

// Components
const LandingPage = ({ onLogin }) => (
  <div className="landing">
    <nav className="landing-nav">
      <div className="logo">Reserve<span>PTY</span></div>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#assets">Assets</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <button className="btn btn-primary" onClick={onLogin}>Sign In</button>
    </nav>
    
    <div className="landing-hero">
      <p className="hero-tagline">Private Family Asset Management</p>
      <h1 className="hero-title">Seamless booking for your family's <em>finest assets</em></h1>
      <p className="hero-subtitle">Coordinate access to homes, planes, boats, and vehicles with elegance and ease.</p>
      <div className="hero-buttons">
        <button className="btn btn-primary" onClick={onLogin}>Get Started</button>
        <button className="btn btn-secondary">Learn More</button>
      </div>
    </div>
    
    <div className="features">
      {[
        { icon: Icons.home, title: 'Vacation Homes', desc: 'Manage family properties across multiple locations' },
        { icon: Icons.plane, title: 'Private Aviation', desc: 'Schedule flights with full trip coordination' },
        { icon: Icons.boat, title: 'Yachts & Boats', desc: 'Book maritime assets with crew scheduling' },
        { icon: Icons.vehicle, title: 'Vehicles', desc: 'Reserve family vehicles at any location' }
      ].map((feature, i) => (
        <div key={i} className="feature-card">
          <div className="feature-icon"><feature.icon /></div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-desc">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const AuthModal = ({ isLogin, onClose, onSubmit, onToggle }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}><Icons.x /></button>
      <h2 className="modal-title font-display">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      <p className="modal-subtitle">{isLogin ? 'Sign in to access your family assets' : 'Join your family\'s asset management platform'}</p>
      
      <form onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        {!isLogin && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Enter your name" />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" className="form-input" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>
      
      <p className="auth-toggle">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={onToggle}>{isLogin ? 'Sign Up' : 'Sign In'}</button>
      </p>
    </div>
  </div>
);

const Sidebar = ({ currentPage, setCurrentPage, user, onLogout }) => (
  <aside className="sidebar">
    <div className="sidebar-logo">Reserve<span>PTY</span></div>
    
    <div className="sidebar-section">
      <p className="sidebar-title">Menu</p>
      <ul className="sidebar-nav">
        {[
          { id: 'dashboard', icon: Icons.dashboard, label: 'Dashboard' },
          { id: 'assets', icon: Icons.home, label: 'All Assets' },
          { id: 'calendar', icon: Icons.calendar, label: 'Calendar' },
          { id: 'settings', icon: Icons.settings, label: 'Settings' }
        ].map(item => (
          <li key={item.id} className="sidebar-item">
            <button 
              className={`sidebar-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              <item.icon /> {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="sidebar-section">
      <p className="sidebar-title">Quick Book</p>
      <ul className="sidebar-nav">
        {[
          { icon: Icons.plane, label: 'Book Flight' },
          { icon: Icons.boat, label: 'Reserve Boat' },
          { icon: Icons.home, label: 'Book Home' }
        ].map((item, i) => (
          <li key={i} className="sidebar-item">
            <button className="sidebar-link"><item.icon /> {item.label}</button>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="sidebar-footer">
      <div className="sidebar-section">
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <button className="sidebar-link" onClick={onLogout}>
              <Icons.logout /> Sign Out
            </button>
          </li>
        </ul>
      </div>
      <div className="user-card">
        <div className="user-avatar">{user.avatar}</div>
        <div className="user-info">
          <p className="user-name">{user.name}</p>
          <p className="user-tier">Tier {user.tier}</p>
        </div>
      </div>
    </div>
  </aside>
);

const AssetCard = ({ asset, onClick }) => {
  const TypeIcon = Icons[asset.type];
  const specs = asset.specs || {};
  
  return (
    <div className="asset-card" onClick={onClick}>
      <div className="asset-image" style={{ backgroundImage: `url(${asset.image})` }}>
        <div className="asset-type-badge">
          <TypeIcon /> {asset.type}
        </div>
        <div className={`asset-status ${asset.status}`}>
          {asset.status}
        </div>
      </div>
      <div className="asset-details">
        <h3 className="asset-name">{asset.name}</h3>
        <p className="asset-location">
          <Icons.mapPin /> {asset.location}
        </p>
        <div className="asset-specs">
          {Object.entries(specs).slice(0, 3).map(([key, value]) => (
            <div key={key} className="spec-item">
              <p className="spec-value">{value}</p>
              <p className="spec-label">{key}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ asset, airports, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  const TypeIcon = Icons[asset.type];
  
  const steps = asset.type === 'plane' 
    ? ['Route', 'Date & Time', 'Confirm']
    : ['Details', 'Date & Time', 'Confirm'];
    
  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    if (step === 3) setTimeout(() => setStep(4), 500);
    if (step === 4) onComplete();
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal booking-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icons.x /></button>
        
        <div className="booking-header">
          <div className="asset-type"><TypeIcon /> {asset.type}</div>
          <h2>{asset.name}</h2>
        </div>
        
        {step < 4 && (
          <div className="booking-steps">
            {steps.map((s, i) => (
              <div key={i} className={`step ${step > i + 1 ? 'completed' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <div className="step-number">{step > i + 1 ? <Icons.check /> : i + 1}</div>
                <span className="step-label">{s}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="booking-content">
          {step === 1 && asset.type === 'plane' && (
            <>
              <div className="airport-select">
                <div className="form-group">
                  <label className="form-label">Departure</label>
                  <select 
                    className="form-select"
                    value={departure?.code || ''}
                    onChange={e => setDeparture(airports.find(a => a.code === e.target.value))}
                  >
                    <option value="">Select airport</option>
                    {airports.map(a => (
                      <option key={a.code} value={a.code}>{a.code} - {a.name}</option>
                    ))}
                  </select>
                </div>
                <span className="airport-arrow">→</span>
                <div className="form-group">
                  <label className="form-label">Arrival</label>
                  <select 
                    className="form-select"
                    value={arrival?.code || ''}
                    onChange={e => setArrival(airports.find(a => a.code === e.target.value))}
                  >
                    <option value="">Select airport</option>
                    {airports.map(a => (
                      <option key={a.code} value={a.code}>{a.code} - {a.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              {departure && arrival && (
                <div className="flight-summary">
                  <div className="route-display">
                    <div className="route-point">
                      <p className="route-code">{departure.code}</p>
                      <p className="route-city">{departure.city}</p>
                    </div>
                    <span className="route-arrow">✈</span>
                    <div className="route-point">
                      <p className="route-code">{arrival.code}</p>
                      <p className="route-city">{arrival.city}</p>
                    </div>
                  </div>
                  <div className="flight-details">
                    <span>Est. Time: ~2h 30m</span>
                    <span>Cruise: {asset.specs?.cruiseSpeed || 450} kts</span>
                    <span>Passengers: {asset.specs?.passengers || 8}</span>
                  </div>
                </div>
              )}
            </>
          )}
          
          {step === 1 && asset.type !== 'plane' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {asset.type === 'home' ? 'Check-in Date' : 'Start Date'}
                  </label>
                  <input type="date" className="form-input" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    {asset.type === 'home' ? 'Check-out Date' : 'End Date'}
                  </label>
                  <input type="date" className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Number of {asset.type === 'home' ? 'Guests' : 'Passengers'}</label>
                <input type="number" className="form-input" min="1" max={asset.specs?.passengers || asset.specs?.bedrooms * 2 || 10} defaultValue="1" />
              </div>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-input" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input type="time" className="form-input" value={time} onChange={e => setTime(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea className="form-textarea" placeholder="Any special requests..." value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
            </>
          )}
          
          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '1rem', color: 'var(--slate)' }}>
                Please confirm your booking details
              </p>
              <div style={{ 
                background: 'var(--cream)', 
                padding: '1.5rem', 
                borderRadius: '8px',
                textAlign: 'left'
              }}>
                <p style={{ marginBottom: '0.5rem' }}><strong>Asset:</strong> {asset.name}</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Type:</strong> {asset.type}</p>
                {departure && arrival && (
                  <p style={{ marginBottom: '0.5rem' }}><strong>Route:</strong> {departure.code} → {arrival.code}</p>
                )}
                <p><strong>Date:</strong> {date || 'Selected date'}</p>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="confirmation">
              <div className="confirmation-icon">
                <Icons.check />
              </div>
              <h3 className="confirmation-title">Booking Confirmed!</h3>
              <p className="confirmation-message">
                Your reservation for {asset.name} has been successfully created.
                You'll receive a confirmation email shortly.
              </p>
            </div>
          )}
          
          {step < 4 && (
            <div className="booking-actions">
              {step > 1 && (
                <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                  Back
                </button>
              )}
              <button className="btn btn-primary" onClick={handleNext}>
                {step === 3 ? 'Confirm Booking' : 'Continue'}
                <span style={{ width: 16, height: 16 }}><Icons.chevronRight /></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Asset Form Modal
const AssetFormModal = ({ asset, onClose, onSave }) => {
  const [formData, setFormData] = useState(asset || {
    type: 'home',
    name: '',
    location: '',
    image: '',
    status: 'available',
    specs: {}
  });
  
  const specFields = {
    plane: [
      { key: 'cruiseSpeed', label: 'Cruise Speed (kts)', type: 'number' },
      { key: 'range', label: 'Range', type: 'text' },
      { key: 'passengers', label: 'Passengers', type: 'number' }
    ],
    boat: [
      { key: 'length', label: 'Length', type: 'text' },
      { key: 'engineHours', label: 'Engine Hours', type: 'number' },
      { key: 'passengers', label: 'Passengers', type: 'number' }
    ],
    home: [
      { key: 'bedrooms', label: 'Bedrooms', type: 'number' },
      { key: 'bathrooms', label: 'Bathrooms', type: 'number' },
      { key: 'sqft', label: 'Square Feet', type: 'text' }
    ],
    vehicle: [
      { key: 'year', label: 'Year', type: 'number' },
      { key: 'seats', label: 'Seats', type: 'number' },
      { key: 'fuel', label: 'Fuel Status', type: 'text' }
    ]
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const updateSpec = (key, value) => {
    setFormData({
      ...formData,
      specs: { ...formData.specs, [key]: value }
    });
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icons.x /></button>
        <h2 className="modal-title font-display">{asset ? 'Edit Asset' : 'Add New Asset'}</h2>
        <p className="modal-subtitle">Fill in the details for this asset</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Asset Type</label>
              <select 
                className="form-select"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value, specs: {} })}
              >
                <option value="plane">Plane</option>
                <option value="boat">Boat</option>
                <option value="home">Home</option>
                <option value="vehicle">Vehicle</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select 
                className="form-select"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Asset Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., Citation CJ4, Beach Villa, etc."
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Location</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., PTY - Tocumen Intl, Bocas del Toro"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input 
              type="url" 
              className="form-input" 
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
            Specifications
          </h3>
          
          <div className="form-row-3">
            {specFields[formData.type]?.map(field => (
              <div key={field.key} className="form-group">
                <label className="form-label">{field.label}</label>
                <input 
                  type={field.type}
                  className="form-input"
                  value={formData.specs[field.key] || ''}
                  onChange={e => updateSpec(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                />
              </div>
            ))}
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {asset ? 'Save Changes' : 'Add Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Generic Item Form Modal (for airports, ports, members)
const ItemFormModal = ({ type, item, onClose, onSave }) => {
  const configs = {
    airport: {
      title: item ? 'Edit Airport' : 'Add Airport',
      fields: [
        { key: 'code', label: 'Airport Code', type: 'text', placeholder: 'PTY' },
        { key: 'name', label: 'Airport Name', type: 'text', placeholder: 'Tocumen International' },
        { key: 'city', label: 'City', type: 'text', placeholder: 'Panama City' },
        { key: 'country', label: 'Country', type: 'text', placeholder: 'Panama' }
      ]
    },
    port: {
      title: item ? 'Edit Port/Marina' : 'Add Port/Marina',
      fields: [
        { key: 'code', label: 'Port Code', type: 'text', placeholder: 'FLM' },
        { key: 'name', label: 'Port Name', type: 'text', placeholder: 'Flamenco Marina' },
        { key: 'city', label: 'City', type: 'text', placeholder: 'Panama City' },
        { key: 'country', label: 'Country', type: 'text', placeholder: 'Panama' }
      ]
    },
    member: {
      title: item ? 'Edit Family Member' : 'Add Family Member',
      fields: [
        { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Carlos Mendoza' },
        { key: 'email', label: 'Email', type: 'email', placeholder: 'carlos@mendoza.family' },
        { key: 'tier', label: 'Tier (1-4)', type: 'number', placeholder: '1' },
        { key: 'role', label: 'Role', type: 'text', placeholder: 'Family Head' }
      ]
    }
  };
  
  const config = configs[type];
  const [formData, setFormData] = useState(item || {});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icons.x /></button>
        <h2 className="modal-title font-display">{config.title}</h2>
        
        <form onSubmit={handleSubmit}>
          {config.fields.map(field => (
            <div key={field.key} className="form-group">
              <label className="form-label">{field.label}</label>
              <input 
                type={field.type}
                className="form-input"
                placeholder={field.placeholder}
                value={formData[field.key] || ''}
                onChange={e => setFormData({ ...formData, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                required
              />
            </div>
          ))}
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteModal = ({ item, itemType, onClose, onConfirm }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}><Icons.x /></button>
      <h2 className="modal-title font-display">Confirm Delete</h2>
      <p className="modal-subtitle">
        Are you sure you want to delete <strong>{item.name || item.code}</strong>? This action cannot be undone.
      </p>
      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

// Settings Page Component
const SettingsPage = ({ 
  assets, airports, ports, members,
  onAddAsset, onEditAsset, onDeleteAsset,
  onAddAirport, onEditAirport, onDeleteAirport,
  onAddPort, onEditPort, onDeletePort,
  onAddMember, onEditMember, onDeleteMember
}) => {
  const [activeTab, setActiveTab] = useState('assets');
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  
  const handleSaveAsset = (data) => {
    if (editingItem) {
      onEditAsset({ ...data, id: editingItem.id });
    } else {
      onAddAsset({ ...data, id: Date.now() });
    }
    setShowAssetForm(false);
    setEditingItem(null);
  };
  
  const handleSaveItem = (data, type) => {
    const handlers = {
      airport: { add: onAddAirport, edit: onEditAirport },
      port: { add: onAddPort, edit: onEditPort },
      member: { add: onAddMember, edit: onEditMember }
    };
    
    if (editingItem) {
      handlers[type].edit({ ...data, id: editingItem.id });
    } else {
      handlers[type].add({ ...data, id: Date.now() });
    }
    setShowItemForm(null);
    setEditingItem(null);
  };
  
  const handleDelete = () => {
    const handlers = {
      asset: onDeleteAsset,
      airport: onDeleteAirport,
      port: onDeletePort,
      member: onDeleteMember
    };
    handlers[deletingItem.type](deletingItem.item.id);
    setDeletingItem(null);
  };
  
  return (
    <>
      <div className="settings-tabs">
        <button 
          className={`settings-tab ${activeTab === 'assets' ? 'active' : ''}`}
          onClick={() => setActiveTab('assets')}
        >
          <Icons.home /> Assets
        </button>
        <button 
          className={`settings-tab ${activeTab === 'airports' ? 'active' : ''}`}
          onClick={() => setActiveTab('airports')}
        >
          <Icons.plane /> Airports
        </button>
        <button 
          className={`settings-tab ${activeTab === 'ports' ? 'active' : ''}`}
          onClick={() => setActiveTab('ports')}
        >
          <Icons.anchor /> Ports & Marinas
        </button>
        <button 
          className={`settings-tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <Icons.users /> Family Members
        </button>
      </div>
      
      {/* Assets Tab */}
      {activeTab === 'assets' && (
        <div className="data-table">
          <div className="data-table-header">
            <h3 className="data-table-title">Family Assets</h3>
            <button className="btn btn-primary btn-sm" onClick={() => { setEditingItem(null); setShowAssetForm(true); }}>
              <Icons.plus /> Add Asset
            </button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map(asset => {
                  const TypeIcon = Icons[asset.type];
                  return (
                    <tr key={asset.id}>
                      <td>
                        <span className="type-badge">
                          <TypeIcon /> {asset.type}
                        </span>
                      </td>
                      <td><strong>{asset.name}</strong></td>
                      <td>{asset.location}</td>
                      <td>
                        <span className={`asset-status ${asset.status}`} style={{ position: 'static' }}>
                          {asset.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button onClick={() => { setEditingItem(asset); setShowAssetForm(true); }}>
                            <Icons.edit />
                          </button>
                          <button className="danger" onClick={() => setDeletingItem({ item: asset, type: 'asset' })}>
                            <Icons.trash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Airports Tab */}
      {activeTab === 'airports' && (
        <div className="data-table">
          <div className="data-table-header">
            <h3 className="data-table-title">Airports</h3>
            <button className="btn btn-primary btn-sm" onClick={() => { setEditingItem(null); setShowItemForm('airport'); }}>
              <Icons.plus /> Add Airport
            </button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {airports.map(airport => (
                  <tr key={airport.id}>
                    <td><strong>{airport.code}</strong></td>
                    <td>{airport.name}</td>
                    <td>{airport.city}</td>
                    <td>{airport.country}</td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => { setEditingItem(airport); setShowItemForm('airport'); }}>
                          <Icons.edit />
                        </button>
                        <button className="danger" onClick={() => setDeletingItem({ item: airport, type: 'airport' })}>
                          <Icons.trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Ports Tab */}
      {activeTab === 'ports' && (
        <div className="data-table">
          <div className="data-table-header">
            <h3 className="data-table-title">Ports & Marinas</h3>
            <button className="btn btn-primary btn-sm" onClick={() => { setEditingItem(null); setShowItemForm('port'); }}>
              <Icons.plus /> Add Port
            </button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ports.map(port => (
                  <tr key={port.id}>
                    <td><strong>{port.code}</strong></td>
                    <td>{port.name}</td>
                    <td>{port.city}</td>
                    <td>{port.country}</td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => { setEditingItem(port); setShowItemForm('port'); }}>
                          <Icons.edit />
                        </button>
                        <button className="danger" onClick={() => setDeletingItem({ item: port, type: 'port' })}>
                          <Icons.trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="data-table">
          <div className="data-table-header">
            <h3 className="data-table-title">Family Members</h3>
            <button className="btn btn-primary btn-sm" onClick={() => { setEditingItem(null); setShowItemForm('member'); }}>
              <Icons.plus /> Add Member
            </button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map(member => (
                  <tr key={member.id}>
                    <td>
                      <span className={`tier-badge tier-${member.tier}`}>
                        {member.tier}
                      </span>
                    </td>
                    <td><strong>{member.name}</strong></td>
                    <td>{member.email}</td>
                    <td>{member.role}</td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => { setEditingItem(member); setShowItemForm('member'); }}>
                          <Icons.edit />
                        </button>
                        <button className="danger" onClick={() => setDeletingItem({ item: member, type: 'member' })}>
                          <Icons.trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Modals */}
      {showAssetForm && (
        <AssetFormModal 
          asset={editingItem}
          onClose={() => { setShowAssetForm(false); setEditingItem(null); }}
          onSave={handleSaveAsset}
        />
      )}
      
      {showItemForm && (
        <ItemFormModal 
          type={showItemForm}
          item={editingItem}
          onClose={() => { setShowItemForm(null); setEditingItem(null); }}
          onSave={(data) => handleSaveItem(data, showItemForm)}
        />
      )}
      
      {deletingItem && (
        <DeleteModal 
          item={deletingItem.item}
          itemType={deletingItem.type}
          onClose={() => setDeletingItem(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

const Dashboard = ({ assets, reservations, onAssetClick }) => (
  <>
    <div className="stats-grid">
      <div className="stat-card">
        <p className="stat-label">Total Assets</p>
        <p className="stat-value">{assets.length}</p>
        <p className="stat-change">Active in your family</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">This Month</p>
        <p className="stat-value">{reservations.length}</p>
        <p className="stat-change">Reservations made</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Available Now</p>
        <p className="stat-value">{assets.filter(a => a.status === 'available').length}</p>
        <p className="stat-change">Ready to book</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Family Members</p>
        <p className="stat-value">12</p>
        <p className="stat-change">Across 4 tiers</p>
      </div>
    </div>
    
    <div className="section-header">
      <h2 className="section-title font-display">Your Assets</h2>
      <button className="section-link">
        View All <Icons.chevronRight />
      </button>
    </div>
    
    <div className="assets-grid">
      {assets.slice(0, 3).map(asset => (
        <AssetCard key={asset.id} asset={asset} onClick={() => onAssetClick(asset)} />
      ))}
    </div>
    
    <div className="section-header" style={{ marginTop: '3rem' }}>
      <h2 className="section-title font-display">Upcoming Reservations</h2>
    </div>
    
    <div className="reservations-list">
      {reservations.map(res => {
        const asset = assets.find(a => a.id === res.assetId);
        const TypeIcon = Icons[asset?.type || 'home'];
        return (
          <div key={res.id} className="reservation-card">
            <div className="reservation-icon">
              <TypeIcon />
            </div>
            <div className="reservation-info">
              <p className="reservation-title">{res.assetName}</p>
              <p className="reservation-meta">
                <Icons.users style={{ width: 14, height: 14 }} />
                {res.user}
                {res.route && ` • ${res.route}`}
              </p>
            </div>
            <div className="reservation-dates">
              <p className="reservation-date">{res.start}</p>
              <span className={`reservation-status ${res.status}`}>{res.status}</span>
            </div>
          </div>
        );
      })}
    </div>
  </>
);

const AssetsPage = ({ assets, onAssetClick }) => (
  <>
    <div className="section-header">
      <h2 className="section-title font-display">All Family Assets</h2>
    </div>
    
    <div className="assets-grid">
      {assets.map(asset => (
        <AssetCard key={asset.id} asset={asset} onClick={() => onAssetClick(asset)} />
      ))}
    </div>
  </>
);

const CalendarPage = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const events = [
    { day: 15, name: 'Boquete Home', type: 'home' },
    { day: 16, name: 'Boquete Home', type: 'home' },
    { day: 17, name: 'Boquete Home', type: 'home' },
    { day: 25, name: 'PTY→SJO Flight', type: 'plane' },
    { day: 1, name: 'Azimut 55', type: 'boat', nextMonth: true }
  ];
  
  const daysInMonth = [];
  for (let i = 0; i < 3; i++) daysInMonth.push({ day: 29 + i, otherMonth: true });
  for (let i = 1; i <= 31; i++) daysInMonth.push({ day: i });
  for (let i = 1; i <= 3; i++) daysInMonth.push({ day: i, otherMonth: true });
  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-title">January 2024</h2>
        <div className="calendar-nav">
          <button>&lt;</button>
          <button>&gt;</button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {days.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {daysInMonth.map((d, i) => (
          <div key={i} className={`calendar-day ${d.otherMonth ? 'other-month' : ''}`}>
            <div className="day-number">{d.day}</div>
            {events.filter(e => e.day === d.day && !e.nextMonth && !d.otherMonth).map((event, j) => (
              <div key={j} className={`calendar-event ${event.type}`}>{event.name}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  // State for all data
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [airports, setAirports] = useState(INITIAL_AIRPORTS);
  const [ports, setPorts] = useState(INITIAL_PORTS);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  
  const handleAssetClick = (asset) => {
    if (asset.status === 'available') {
      setSelectedAsset(asset);
    }
  };
  
  // CRUD handlers for assets
  const handleAddAsset = (asset) => setAssets([...assets, asset]);
  const handleEditAsset = (updated) => setAssets(assets.map(a => a.id === updated.id ? updated : a));
  const handleDeleteAsset = (id) => setAssets(assets.filter(a => a.id !== id));
  
  // CRUD handlers for airports
  const handleAddAirport = (airport) => setAirports([...airports, airport]);
  const handleEditAirport = (updated) => setAirports(airports.map(a => a.id === updated.id ? updated : a));
  const handleDeleteAirport = (id) => setAirports(airports.filter(a => a.id !== id));
  
  // CRUD handlers for ports
  const handleAddPort = (port) => setPorts([...ports, port]);
  const handleEditPort = (updated) => setPorts(ports.map(p => p.id === updated.id ? updated : p));
  const handleDeletePort = (id) => setPorts(ports.filter(p => p.id !== id));
  
  // CRUD handlers for members
  const handleAddMember = (member) => setMembers([...members, member]);
  const handleEditMember = (updated) => setMembers(members.map(m => m.id === updated.id ? updated : m));
  const handleDeleteMember = (id) => setMembers(members.filter(m => m.id !== id));
  
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);
  
  if (!isLoggedIn) {
    return (
      <>
        <LandingPage onLogin={() => setShowAuth(true)} />
        {showAuth && (
          <AuthModal
            isLogin={isLogin}
            onClose={() => setShowAuth(false)}
            onSubmit={() => { setShowAuth(false); setIsLoggedIn(true); }}
            onToggle={() => setIsLogin(!isLogin)}
          />
        )}
      </>
    );
  }
  
  return (
    <div className="dashboard">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        user={INITIAL_USER}
        onLogout={() => setIsLoggedIn(false)}
      />
      
      <main className="main-content">
        <header className="content-header">
          <h1 className="page-title">
            {currentPage === 'dashboard' && 'Dashboard'}
            {currentPage === 'assets' && 'All Assets'}
            {currentPage === 'calendar' && 'Calendar'}
            {currentPage === 'settings' && 'Settings'}
          </h1>
          {currentPage !== 'settings' && (
            <button className="btn btn-primary" onClick={() => setCurrentPage('assets')}>
              New Reservation
            </button>
          )}
        </header>
        
        <div className="content-body">
          {currentPage === 'dashboard' && (
            <Dashboard 
              assets={assets} 
              reservations={reservations}
              onAssetClick={handleAssetClick}
            />
          )}
          {currentPage === 'assets' && (
            <AssetsPage 
              assets={assets}
              onAssetClick={handleAssetClick}
            />
          )}
          {currentPage === 'calendar' && <CalendarPage />}
          {currentPage === 'settings' && (
            <SettingsPage 
              assets={assets}
              airports={airports}
              ports={ports}
              members={members}
              onAddAsset={handleAddAsset}
              onEditAsset={handleEditAsset}
              onDeleteAsset={handleDeleteAsset}
              onAddAirport={handleAddAirport}
              onEditAirport={handleEditAirport}
              onDeleteAirport={handleDeleteAirport}
              onAddPort={handleAddPort}
              onEditPort={handleEditPort}
              onDeletePort={handleDeletePort}
              onAddMember={handleAddMember}
              onEditMember={handleEditMember}
              onDeleteMember={handleDeleteMember}
            />
          )}
        </div>
      </main>
      
      {selectedAsset && (
        <BookingModal 
          asset={selectedAsset}
          airports={airports}
          onClose={() => setSelectedAsset(null)}
          onComplete={() => {
            setSelectedAsset(null);
            setCurrentPage('dashboard');
          }}
        />
      )}
    </div>
  );
}

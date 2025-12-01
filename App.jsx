import React, { useState, useEffect } from 'react';

// Mock data
const MOCK_USER = {
  id: 1,
  name: 'Carlos Mendoza',
  email: 'carlos@family.com',
  tier: 1,
  avatar: 'CM',
  family: 'Mendoza Family Trust'
};

const MOCK_ASSETS = [
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

const MOCK_RESERVATIONS = [
  { id: 1, assetId: 3, assetName: 'Boquete Mountain Retreat', user: 'Maria Mendoza', start: '2024-01-15', end: '2024-01-20', status: 'active' },
  { id: 2, assetId: 1, assetName: 'Citation CJ4', user: 'Carlos Mendoza', start: '2024-01-25', end: '2024-01-25', status: 'upcoming', route: 'PTY → SJO' },
  { id: 3, assetId: 2, assetName: 'Azimut 55', user: 'Ana Mendoza', start: '2024-02-01', end: '2024-02-03', status: 'upcoming' }
];

const AIRPORTS = [
  { code: 'PTY', name: 'Tocumen International', city: 'Panama City' },
  { code: 'SJO', name: 'Juan Santamaría', city: 'San José, Costa Rica' },
  { code: 'BOG', name: 'El Dorado', city: 'Bogotá, Colombia' },
  { code: 'MDE', name: 'José María Córdova', city: 'Medellín, Colombia' },
  { code: 'CTG', name: 'Rafael Núñez', city: 'Cartagena, Colombia' },
  { code: 'MIA', name: 'Miami International', city: 'Miami, USA' }
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
  arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  mapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
};

// Styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
  
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
    box-shadow: 0 10px 30px rgba(201, 169, 98, 0.3);
  }
  
  .btn-secondary {
    background: transparent;
    color: var(--cream);
    border: 1px solid rgba(250, 248, 245, 0.3);
  }
  
  .btn-secondary:hover {
    border-color: var(--cream);
    background: rgba(250, 248, 245, 0.1);
  }
  
  .landing-features {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(250, 248, 245, 0.1);
    margin-top: 4rem;
    position: relative;
    z-index: 10;
  }
  
  .feature-card {
    background: rgba(10, 22, 40, 0.8);
    padding: 3rem 2rem;
    text-align: center;
    transition: background 0.3s;
  }
  
  .feature-card:hover {
    background: rgba(30, 58, 95, 0.8);
  }
  
  .feature-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 1.5rem;
    color: var(--gold);
  }
  
  .feature-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    color: var(--cream);
    margin-bottom: 0.75rem;
  }
  
  .feature-desc {
    font-size: 0.85rem;
    color: rgba(250, 248, 245, 0.6);
    font-weight: 300;
  }
  
  /* Auth Modal */
  .auth-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    backdrop-filter: blur(10px);
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .auth-modal {
    background: var(--cream);
    padding: 3rem;
    border-radius: 8px;
    width: 100%;
    max-width: 420px;
    animation: slideUp 0.4s ease;
    position: relative;
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .auth-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--slate);
    transition: color 0.3s;
  }
  
  .auth-close:hover {
    color: var(--navy);
  }
  
  .auth-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: var(--navy);
    margin-bottom: 0.5rem;
  }
  
  .auth-subtitle {
    color: var(--slate);
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--navy);
    margin-bottom: 0.5rem;
  }
  
  .form-input {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    border: 1px solid var(--cream-dark);
    border-radius: 4px;
    background: white;
    color: var(--navy);
    font-family: 'Outfit', sans-serif;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .form-input:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.1);
  }
  
  .form-input::placeholder {
    color: var(--slate);
  }
  
  .auth-submit {
    width: 100%;
    margin-top: 1.5rem;
  }
  
  .auth-switch {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: var(--slate);
  }
  
  .auth-switch button {
    background: none;
    border: none;
    color: var(--navy);
    font-weight: 600;
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
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 50;
  }
  
  .sidebar-logo {
    padding: 0 2rem;
    margin-bottom: 3rem;
  }
  
  .sidebar-nav {
    flex: 1;
  }
  
  .nav-section {
    margin-bottom: 2rem;
  }
  
  .nav-section-title {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--slate);
    padding: 0 2rem;
    margin-bottom: 0.75rem;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.875rem 2rem;
    color: rgba(250, 248, 245, 0.7);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }
  
  .nav-item:hover, .nav-item.active {
    color: var(--cream);
    background: rgba(201, 169, 98, 0.1);
    border-left: 3px solid var(--gold);
  }
  
  .nav-item svg {
    width: 20px;
    height: 20px;
  }
  
  .sidebar-user {
    padding: 1.5rem 2rem;
    border-top: 1px solid rgba(250, 248, 245, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
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
    font-size: 0.95rem;
  }
  
  .user-tier {
    color: var(--gold);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* Main Content */
  .main-content {
    flex: 1;
    margin-left: 280px;
    min-height: 100vh;
  }
  
  .content-header {
    background: white;
    padding: 1.5rem 3rem;
    border-bottom: 1px solid var(--cream-dark);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 40;
  }
  
  .page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--navy);
  }
  
  .content-body {
    padding: 2rem 3rem;
  }
  
  /* Dashboard Cards */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .stat-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid var(--cream-dark);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(10, 22, 40, 0.08);
  }
  
  .stat-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--slate);
    margin-bottom: 0.5rem;
  }
  
  .stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--navy);
  }
  
  .stat-change {
    font-size: 0.8rem;
    color: var(--success);
    margin-top: 0.5rem;
  }
  
  /* Section Headers */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--navy);
  }
  
  .section-link {
    color: var(--gold);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    background: none;
    border: none;
  }
  
  .section-link:hover {
    text-decoration: underline;
  }
  
  .section-link svg {
    width: 16px;
    height: 16px;
  }
  
  /* Asset Grid */
  .assets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  
  .asset-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--cream-dark);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }
  
  .asset-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(10, 22, 40, 0.1);
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
    padding: 0.4rem 0.75rem;
    border-radius: 4px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  
  .asset-type-badge svg {
    width: 14px;
    height: 14px;
  }
  
  .asset-status {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.4rem 0.75rem;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .status-available {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success);
  }
  
  .status-occupied {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning);
  }
  
  .asset-details {
    padding: 1.5rem;
  }
  
  .asset-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--navy);
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
    display: flex;
    gap: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--cream-dark);
  }
  
  .spec-item {
    text-align: center;
  }
  
  .spec-value {
    font-weight: 600;
    color: var(--navy);
    font-size: 0.95rem;
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
    gap: 1rem;
  }
  
  .reservation-card {
    background: white;
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    border: 1px solid var(--cream-dark);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: all 0.3s;
  }
  
  .reservation-card:hover {
    border-color: var(--gold);
    box-shadow: 0 4px 20px rgba(201, 169, 98, 0.1);
  }
  
  .reservation-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: var(--navy);
    color: var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .reservation-icon svg {
    width: 24px;
    height: 24px;
  }
  
  .reservation-info {
    flex: 1;
  }
  
  .reservation-title {
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 0.25rem;
  }
  
  .reservation-meta {
    font-size: 0.85rem;
    color: var(--slate);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .reservation-dates {
    text-align: right;
  }
  
  .reservation-date {
    font-weight: 500;
    color: var(--navy);
  }
  
  .reservation-status {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    margin-top: 0.5rem;
    display: inline-block;
  }
  
  .reservation-status.active {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
  }
  
  .reservation-status.upcoming {
    background: rgba(201, 169, 98, 0.15);
    color: var(--gold);
  }
  
  /* Booking Modal */
  .booking-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.9);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 100;
    overflow-y: auto;
    padding: 2rem;
    backdrop-filter: blur(10px);
  }
  
  .booking-modal {
    background: var(--cream);
    border-radius: 12px;
    width: 100%;
    max-width: 800px;
    margin: 2rem 0;
    animation: slideUp 0.4s ease;
    overflow: hidden;
  }
  
  .booking-header {
    background: var(--navy);
    padding: 2rem;
    color: var(--cream);
    position: relative;
  }
  
  .booking-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 40px;
    height: 40px;
    background: rgba(250, 248, 245, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
  }
  
  .booking-close:hover {
    background: rgba(250, 248, 245, 0.2);
  }
  
  .booking-asset-type {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--gold);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .booking-asset-type svg {
    width: 16px;
    height: 16px;
  }
  
  .booking-asset-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 500;
  }
  
  .booking-body {
    padding: 2rem;
  }
  
  .booking-steps {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--cream-dark);
  }
  
  .booking-step {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s;
  }
  
  .step-number.active {
    background: var(--gold);
    color: var(--navy);
  }
  
  .step-number.completed {
    background: var(--success);
    color: white;
  }
  
  .step-number.pending {
    background: var(--cream-dark);
    color: var(--slate);
  }
  
  .step-label {
    font-size: 0.9rem;
    color: var(--slate);
  }
  
  .step-label.active {
    color: var(--navy);
    font-weight: 500;
  }
  
  .booking-form {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .form-row.single {
    grid-template-columns: 1fr;
  }
  
  .airport-select {
    position: relative;
  }
  
  .airport-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--cream-dark);
    border-radius: 4px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    z-index: 10;
    max-height: 250px;
    overflow-y: auto;
  }
  
  .airport-option {
    padding: 1rem;
    cursor: pointer;
    border-bottom: 1px solid var(--cream-dark);
    transition: background 0.2s;
  }
  
  .airport-option:hover {
    background: var(--cream);
  }
  
  .airport-option:last-child {
    border-bottom: none;
  }
  
  .airport-code {
    font-weight: 700;
    color: var(--navy);
    font-size: 1rem;
    margin-right: 0.5rem;
  }
  
  .airport-name {
    color: var(--slate);
    font-size: 0.9rem;
  }
  
  .flight-summary {
    background: var(--navy);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
    color: var(--cream);
  }
  
  .flight-route {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .flight-point {
    text-align: center;
  }
  
  .flight-code {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .flight-city {
    font-size: 0.85rem;
    color: rgba(250, 248, 245, 0.7);
  }
  
  .flight-arrow {
    width: 60px;
    height: 2px;
    background: var(--gold);
    position: relative;
  }
  
  .flight-arrow::after {
    content: '';
    position: absolute;
    right: 0;
    top: -4px;
    border: 5px solid transparent;
    border-left-color: var(--gold);
  }
  
  .flight-details {
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(250, 248, 245, 0.1);
  }
  
  .flight-detail {
    text-align: center;
  }
  
  .flight-detail-value {
    color: var(--gold);
    font-weight: 600;
    font-size: 1.1rem;
  }
  
  .flight-detail-label {
    font-size: 0.75rem;
    color: rgba(250, 248, 245, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .booking-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: flex-end;
  }
  
  /* Calendar Page */
  .calendar-container {
    background: white;
    border-radius: 12px;
    border: 1px solid var(--cream-dark);
    overflow: hidden;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: var(--navy);
    color: var(--cream);
  }
  
  .calendar-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 500;
  }
  
  .calendar-nav {
    display: flex;
    gap: 0.5rem;
  }
  
  .calendar-nav button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(250, 248, 245, 0.2);
    background: transparent;
    color: var(--cream);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  
  .calendar-nav button:hover {
    background: rgba(250, 248, 245, 0.1);
    border-color: rgba(250, 248, 245, 0.4);
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  
  .calendar-day-header {
    padding: 1rem;
    text-align: center;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--slate);
    background: var(--cream);
    font-weight: 500;
  }
  
  .calendar-day {
    min-height: 120px;
    padding: 0.75rem;
    border: 1px solid var(--cream-dark);
    border-top: none;
    border-left: none;
    background: white;
    transition: background 0.2s;
  }
  
  .calendar-day:nth-child(7n) {
    border-right: none;
  }
  
  .calendar-day:hover {
    background: var(--cream);
  }
  
  .calendar-day.other-month {
    background: var(--cream);
    opacity: 0.5;
  }
  
  .day-number {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--navy);
    margin-bottom: 0.5rem;
  }
  
  .calendar-event {
    font-size: 0.75rem;
    padding: 0.35rem 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .calendar-event:hover {
    transform: scale(1.02);
  }
  
  .calendar-event.home {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success);
  }
  
  .calendar-event.plane {
    background: rgba(99, 102, 241, 0.15);
    color: #6366f1;
  }
  
  .calendar-event.boat {
    background: rgba(14, 165, 233, 0.15);
    color: #0ea5e9;
  }
  
  /* Confirmation */
  .confirmation {
    text-align: center;
    padding: 3rem 2rem;
  }
  
  .confirmation-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--success);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    animation: scaleIn 0.5s ease;
  }
  
  @keyframes scaleIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .confirmation-icon svg {
    width: 40px;
    height: 40px;
  }
  
  .confirmation-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: var(--navy);
    margin-bottom: 0.75rem;
  }
  
  .confirmation-message {
    color: var(--slate);
    margin-bottom: 2rem;
  }
  
  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--slate);
  }
  
  .empty-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    color: var(--cream-dark);
  }
  
  /* Responsive */
  @media (max-width: 1200px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .landing-features {
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
    
    .hero-buttons {
      flex-direction: column;
    }
    
    .landing-features {
      grid-template-columns: 1fr;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .content-body {
      padding: 1.5rem;
    }
    
    .form-row {
      grid-template-columns: 1fr;
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
      <button className="btn btn-secondary" onClick={onLogin}>Sign In</button>
    </nav>
    
    <div className="landing-hero">
      <p className="hero-tagline">Private Asset Management</p>
      <h1 className="hero-title">
        Seamless booking for your family's <em>finest assets</em>
      </h1>
      <p className="hero-subtitle">
        Coordinate shared homes, aviation, yachts, and vehicles with elegant simplicity.
      </p>
      <div className="hero-buttons">
        <button className="btn btn-primary" onClick={onLogin}>
          Get Started
          <span style={{ width: 20, height: 20 }}><Icons.arrow /></span>
        </button>
        <button className="btn btn-secondary">Learn More</button>
      </div>
    </div>
    
    <div className="landing-features">
      <div className="feature-card">
        <div className="feature-icon"><Icons.home /></div>
        <h3 className="feature-title">Vacation Homes</h3>
        <p className="feature-desc">Manage seasonal bookings with automatic buffer days</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon"><Icons.plane /></div>
        <h3 className="feature-title">Private Aviation</h3>
        <p className="feature-desc">Flight planning with automatic time calculations</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon"><Icons.boat /></div>
        <h3 className="feature-title">Yachts & Boats</h3>
        <p className="feature-desc">Port-to-port booking with engine hour tracking</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon"><Icons.vehicle /></div>
        <h3 className="feature-title">Vehicles</h3>
        <p className="feature-desc">Car sharing with location and fuel tracking</p>
      </div>
    </div>
  </div>
);

const AuthModal = ({ isLogin, onClose, onSubmit, onToggle }) => (
  <div className="auth-overlay">
    <div className="auth-modal">
      <button className="auth-close" onClick={onClose}>
        <Icons.x />
      </button>
      <h2 className="auth-title font-display">{isLogin ? 'Welcome Back' : 'Join Your Family'}</h2>
      <p className="auth-subtitle">
        {isLogin ? 'Sign in to access your assets' : 'Create your account to get started'}
      </p>
      
      <div>
        {!isLogin && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Enter your name" />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" className="form-input" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" className="form-input" placeholder="Enter your password" />
        </div>
        <button className="btn btn-primary auth-submit" onClick={onSubmit}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </div>
      
      <p className="auth-switch">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={onToggle}>{isLogin ? 'Sign Up' : 'Sign In'}</button>
      </p>
    </div>
  </div>
);

const Sidebar = ({ currentPage, setCurrentPage, user, onLogout }) => (
  <aside className="sidebar">
    <div className="sidebar-logo">
      <div className="logo">Reserve<span>PTY</span></div>
    </div>
    
    <nav className="sidebar-nav">
      <div className="nav-section">
        <p className="nav-section-title">Menu</p>
        <button 
          className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          <Icons.dashboard />
          Dashboard
        </button>
        <button 
          className={`nav-item ${currentPage === 'assets' ? 'active' : ''}`}
          onClick={() => setCurrentPage('assets')}
        >
          <Icons.home />
          All Assets
        </button>
        <button 
          className={`nav-item ${currentPage === 'calendar' ? 'active' : ''}`}
          onClick={() => setCurrentPage('calendar')}
        >
          <Icons.calendar />
          Calendar
        </button>
      </div>
      
      <div className="nav-section">
        <p className="nav-section-title">Quick Book</p>
        <button className="nav-item" onClick={() => setCurrentPage('assets')}>
          <Icons.plane />
          Book Flight
        </button>
        <button className="nav-item" onClick={() => setCurrentPage('assets')}>
          <Icons.boat />
          Reserve Boat
        </button>
        <button className="nav-item" onClick={() => setCurrentPage('assets')}>
          <Icons.home />
          Book Home
        </button>
      </div>
      
      <div className="nav-section">
        <p className="nav-section-title">Account</p>
        <button className="nav-item">
          <Icons.settings />
          Settings
        </button>
        <button className="nav-item" onClick={onLogout}>
          <Icons.logout />
          Sign Out
        </button>
      </div>
    </nav>
    
    <div className="sidebar-user">
      <div className="user-avatar">{user.avatar}</div>
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-tier">Tier {user.tier} Member</div>
      </div>
    </div>
  </aside>
);

const AssetCard = ({ asset, onClick }) => {
  const TypeIcon = Icons[asset.type];
  
  return (
    <div className="asset-card" onClick={onClick}>
      <div className="asset-image" style={{ backgroundImage: `url(${asset.image})` }}>
        <div className="asset-type-badge">
          <TypeIcon />
          {asset.type}
        </div>
        <div className={`asset-status status-${asset.status}`}>
          {asset.status}
        </div>
      </div>
      <div className="asset-details">
        <h3 className="asset-name">{asset.name}</h3>
        <p className="asset-location">
          <Icons.mapPin />
          {asset.location}
        </p>
        <div className="asset-specs">
          {Object.entries(asset.specs).slice(0, 3).map(([key, value]) => (
            <div className="spec-item" key={key}>
              <div className="spec-value">{value}</div>
              <div className="spec-label">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ asset, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [date, setDate] = useState('');
  const [showDeparture, setShowDeparture] = useState(false);
  const [showArrival, setShowArrival] = useState(false);
  
  const TypeIcon = Icons[asset.type];
  
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setStep(4);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };
  
  const estimatedTime = departure && arrival ? 
    `${Math.round(Math.random() * 60 + 60)} min` : null;
  
  return (
    <div className="booking-overlay">
      <div className="booking-modal">
        <div className="booking-header">
          <button className="booking-close" onClick={onClose}>
            <Icons.x />
          </button>
          <div className="booking-asset-type">
            <TypeIcon />
            {asset.type} Reservation
          </div>
          <h2 className="booking-asset-name">{asset.name}</h2>
        </div>
        
        <div className="booking-body">
          {step < 4 && (
            <div className="booking-steps">
              <div className="booking-step">
                <span className={`step-number ${step >= 1 ? (step > 1 ? 'completed' : 'active') : 'pending'}`}>
                  {step > 1 ? <Icons.check /> : '1'}
                </span>
                <span className={`step-label ${step === 1 ? 'active' : ''}`}>
                  {asset.type === 'plane' ? 'Route' : 'Details'}
                </span>
              </div>
              <div className="booking-step">
                <span className={`step-number ${step >= 2 ? (step > 2 ? 'completed' : 'active') : 'pending'}`}>
                  {step > 2 ? <Icons.check /> : '2'}
                </span>
                <span className={`step-label ${step === 2 ? 'active' : ''}`}>Date & Time</span>
              </div>
              <div className="booking-step">
                <span className={`step-number ${step >= 3 ? 'active' : 'pending'}`}>3</span>
                <span className={`step-label ${step === 3 ? 'active' : ''}`}>Confirm</span>
              </div>
            </div>
          )}
          
          <div className="booking-form">
            {step === 1 && asset.type === 'plane' && (
              <>
                <div className="form-row">
                  <div className="form-group airport-select">
                    <label className="form-label">Departure Airport</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Select airport..."
                      value={departure ? `${departure.code} - ${departure.city}` : ''}
                      onFocus={() => setShowDeparture(true)}
                      readOnly
                    />
                    {showDeparture && (
                      <div className="airport-dropdown">
                        {AIRPORTS.map(airport => (
                          <div 
                            key={airport.code} 
                            className="airport-option"
                            onClick={() => { setDeparture(airport); setShowDeparture(false); }}
                          >
                            <span className="airport-code">{airport.code}</span>
                            <span className="airport-name">{airport.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="form-group airport-select">
                    <label className="form-label">Arrival Airport</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Select airport..."
                      value={arrival ? `${arrival.code} - ${arrival.city}` : ''}
                      onFocus={() => setShowArrival(true)}
                      readOnly
                    />
                    {showArrival && (
                      <div className="airport-dropdown">
                        {AIRPORTS.filter(a => a.code !== departure?.code).map(airport => (
                          <div 
                            key={airport.code} 
                            className="airport-option"
                            onClick={() => { setArrival(airport); setShowArrival(false); }}
                          >
                            <span className="airport-code">{airport.code}</span>
                            <span className="airport-name">{airport.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {departure && arrival && (
                  <div className="flight-summary">
                    <div className="flight-route">
                      <div className="flight-point">
                        <div className="flight-code">{departure.code}</div>
                        <div className="flight-city">{departure.city}</div>
                      </div>
                      <div className="flight-arrow" />
                      <div className="flight-point">
                        <div className="flight-code">{arrival.code}</div>
                        <div className="flight-city">{arrival.city}</div>
                      </div>
                    </div>
                    <div className="flight-details">
                      <div className="flight-detail">
                        <div className="flight-detail-value">{estimatedTime}</div>
                        <div className="flight-detail-label">Est. Flight Time</div>
                      </div>
                      <div className="flight-detail">
                        <div className="flight-detail-value">{asset.specs.cruiseSpeed} kts</div>
                        <div className="flight-detail-label">Cruise Speed</div>
                      </div>
                      <div className="flight-detail">
                        <div className="flight-detail-value">{asset.specs.passengers}</div>
                        <div className="flight-detail-label">Passengers</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {step === 1 && asset.type === 'home' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Check-in Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-group">
                    <label className="form-label">Number of Guests</label>
                    <input type="number" className="form-input" placeholder="Enter number of guests" min="1" max={asset.specs.bedrooms * 2} />
                  </div>
                </div>
              </>
            )}
            
            {step === 1 && asset.type === 'boat' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Departure Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Return Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Departure Time</label>
                    <input type="time" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Passengers</label>
                    <input type="number" className="form-input" placeholder="Max 12" min="1" max="12" />
                  </div>
                </div>
              </>
            )}
            
            {step === 1 && asset.type === 'vehicle' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pick-up Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Return Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-group">
                    <label className="form-label">Pick-up Location</label>
                    <input type="text" className="form-input" placeholder={asset.location} readOnly />
                  </div>
                </div>
              </>
            )}
            
            {step === 2 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input type="time" className="form-input" />
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-group">
                    <label className="form-label">Notes (Optional)</label>
                    <textarea 
                      className="form-input" 
                      rows="3" 
                      placeholder="Any special requests or notes..."
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                </div>
              </>
            )}
            
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h3 style={{ 
                  fontFamily: 'Cormorant Garamond, serif', 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem',
                  color: 'var(--navy)'
                }}>
                  Confirm Your Reservation
                </h3>
                <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>
                  Please review your booking details before confirming.
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
    </div>
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
  
  const handleAssetClick = (asset) => {
    if (asset.status === 'available') {
      setSelectedAsset(asset);
    }
  };
  
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
        user={MOCK_USER}
        onLogout={() => setIsLoggedIn(false)}
      />
      
      <main className="main-content">
        <header className="content-header">
          <h1 className="page-title">
            {currentPage === 'dashboard' && 'Dashboard'}
            {currentPage === 'assets' && 'All Assets'}
            {currentPage === 'calendar' && 'Calendar'}
          </h1>
          <button className="btn btn-primary" onClick={() => setCurrentPage('assets')}>
            New Reservation
          </button>
        </header>
        
        <div className="content-body">
          {currentPage === 'dashboard' && (
            <Dashboard 
              assets={MOCK_ASSETS} 
              reservations={MOCK_RESERVATIONS}
              onAssetClick={handleAssetClick}
            />
          )}
          {currentPage === 'assets' && (
            <AssetsPage 
              assets={MOCK_ASSETS}
              onAssetClick={handleAssetClick}
            />
          )}
          {currentPage === 'calendar' && <CalendarPage />}
        </div>
      </main>
      
      {selectedAsset && (
        <BookingModal 
          asset={selectedAsset}
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

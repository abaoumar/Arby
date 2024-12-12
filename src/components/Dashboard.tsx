'use client'; 

import React, { useState } from 'react';
import { Wallet, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [riskLevel, setRiskLevel] = useState(50);
  const [opportunities] = useState([
    { id: 1, fromToken: 'BONK', toToken: 'WIF', profit: 2.5, risk: 0.3 },
    { id: 2, fromToken: 'MYRO', toToken: 'BONK', profit: 1.8, risk: 0.5 }
  ]);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Solana Arbitrage Dashboard</h1>
        <button 
          onClick={handleConnectWallet}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isWalletConnected 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}
        >
          <Wallet className="w-4 h-4" />
          {isWalletConnected ? 'Connected' : 'Connect Wallet'}
        </button>
      </div>

      {isWalletConnected ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Risk Settings</h2>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={100}
                value={riskLevel}
                onChange={(e) => setRiskLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium">{riskLevel}%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Active Opportunities</h2>
            <div className="space-y-4">
              {opportunities.map((opp) => (
                <div 
                  key={opp.id} 
                  className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">
                        {opp.fromToken} → {opp.toToken}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Potential Profit: {opp.profit}%
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Risk Score: {opp.risk}
                    </div>
                  </div>
                  <button 
                    className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Execute Trade
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <h2 className="text-xl mb-4">Connect your wallet to get started</h2>
          <p className="text-gray-600">
            View arbitrage opportunities and start trading
          </p>
        </div>
      )}
    </div>
  );
}
"use client"

import { useState } from "react"
import { Calculator, Euro, Percent, RefreshCw } from "lucide-react"

export function FinancingSimulation() {
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [interestRate, setInterestRate] = useState<number>(0)
  const [repaymentRate, setRepaymentRate] = useState<number>(0)
  const [monthlyOperatingProfit, setMonthlyOperatingProfit] = useState<number>(0)
  
  // Calculate yearly
  const yearlyInterest = loanAmount * (interestRate / 100)
  const yearlyRepayment = loanAmount * (repaymentRate / 100)
  const yearlyDebtService = yearlyInterest + yearlyRepayment
  
  // Monthly
  const monthlyDebtService = yearlyDebtService / 12
  const monthlyInterest = yearlyInterest / 12
  const monthlyRepayment = yearlyRepayment / 12
  
  // Cashflow
  const monthlyCashflow = monthlyOperatingProfit - monthlyDebtService
  const yearlyCashflow = monthlyCashflow * 12
  
  // DSCR = Operating Profit / Debt Service
  const dscr = monthlyDebtService > 0 ? monthlyOperatingProfit / monthlyDebtService : 0

  return (
    <div className="bg-background border border-border rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Finanzierungssimulation</h3>
          <p className="text-sm text-muted-foreground">Berechnung von Kapitaldienst und Cashflow (Simulation)</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-4 rounded-xl mb-6">
        <strong>Hinweis:</strong> Dies ist eine rein simulative Berechnung zur Vorbereitung von Bankgesprächen. Die Werte werden nicht gespeichert und beeinflussen nicht die echten Ist-Zahlen des Reportings.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Eingaben */}
        <div className="space-y-4">
          <h4 className="font-semibold mb-4">Eingabeparameter</h4>
          
          <div>
            <label className="block text-sm font-medium mb-1">Geplante Darlehenssumme</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Euro className="h-4 w-4 text-muted-foreground" />
              </div>
              <input 
                type="number" 
                value={loanAmount || ''} 
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="pl-9 w-full px-3 py-2 border border-border rounded-lg"
                placeholder="z.B. 250000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sollzinssatz p.a.</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </div>
                <input 
                  type="number" 
                  step="0.1"
                  value={interestRate || ''} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="pl-9 w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="z.B. 4.5"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tilgung p.a.</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </div>
                <input 
                  type="number" 
                  step="0.1"
                  value={repaymentRate || ''} 
                  onChange={(e) => setRepaymentRate(Number(e.target.value))}
                  className="pl-9 w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="z.B. 2.0"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Erwarteter Operativer Monatsgewinn</label>
            <p className="text-xs text-muted-foreground mb-2">Gewinn vor Zinsen, Steuern & Abschreibungen (EBITDA)</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Euro className="h-4 w-4 text-muted-foreground" />
              </div>
              <input 
                type="number" 
                value={monthlyOperatingProfit || ''} 
                onChange={(e) => setMonthlyOperatingProfit(Number(e.target.value))}
                className="pl-9 w-full px-3 py-2 border border-border rounded-lg"
                placeholder="z.B. 2500"
              />
            </div>
          </div>
          
          <button 
            onClick={() => {
              setLoanAmount(0); setInterestRate(0); setRepaymentRate(0); setMonthlyOperatingProfit(0);
            }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-4"
          >
            <RefreshCw className="w-4 h-4" /> Werte zurücksetzen
          </button>
        </div>

        {/* Ergebnisse */}
        <div className="bg-muted/30 p-6 rounded-xl border border-border">
          <h4 className="font-semibold mb-6">Simulationsergebnis</h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-border/50 pb-2">
              <div>
                <p className="text-sm font-medium">Monatliche Zinsbelastung</p>
              </div>
              <p className="font-medium">€ {monthlyInterest.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            
            <div className="flex justify-between items-end border-b border-border/50 pb-2">
              <div>
                <p className="text-sm font-medium">Monatliche Tilgung</p>
              </div>
              <p className="font-medium">€ {monthlyRepayment.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            
            <div className="flex justify-between items-end border-b border-border/50 pb-2 bg-primary/5 p-2 rounded">
              <div>
                <p className="text-sm font-bold text-primary">Monatliche Kreditrate (Kapitaldienst)</p>
              </div>
              <p className="font-bold text-primary">€ {monthlyDebtService.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            
            <div className="flex justify-between items-end border-b border-border/50 pb-2 pt-2">
              <div>
                <p className="text-sm font-medium">Operativer Gewinn (Monat)</p>
              </div>
              <p className="font-medium">€ {monthlyOperatingProfit.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            
            <div className={`flex justify-between items-end p-3 rounded-lg border ${monthlyCashflow >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div>
                <p className={`text-sm font-bold ${monthlyCashflow >= 0 ? 'text-green-800' : 'text-red-800'}`}>Verbleibender Cashflow (Monat)</p>
                <p className={`text-xs ${monthlyCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>nach Kapitaldienst</p>
              </div>
              <p className={`font-bold text-lg ${monthlyCashflow >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                € {monthlyCashflow.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
               <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-bold">Kapitaldienstdeckungsgrad (DSCR)</p>
                <p className={`font-bold text-xl ${dscr >= 1.2 ? 'text-green-600' : dscr >= 1.0 ? 'text-amber-500' : 'text-red-600'}`}>
                  {dscr.toFixed(2)}
                </p>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${dscr >= 1.2 ? 'bg-green-500' : dscr >= 1.0 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(Math.max((dscr / 2) * 100, 0), 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Ein DSCR {'>'} 1,2 wird von Banken meist positiv bewertet. Ein Wert {`<`} 1,0 bedeutet, dass der Cashflow nicht ausreicht, um den Kredit zu bedienen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

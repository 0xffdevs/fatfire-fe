/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { TrendingUp, PiggyBank, Target, Info, BarChart3, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Helper: currency formatting based on selected currency
function formatMoney(value: number, currency: 'INR' | 'USD') {
    const symbol = currency === 'INR' ? '₹' : '$';
    const locale = currency === 'INR' ? 'en-IN' : 'en-US';
    return `${symbol}${value.toLocaleString(locale, { maximumFractionDigits: 0 })}`;
}

export default function CalculatorsPage() {
    type CalcKey = 'compound' | 'fire' | 'sip' | 'trading';
    const [activeCalculator, setActiveCalculator] = useState<CalcKey>('compound');

    // ================== Global Settings (Currency) ==================
    // currency: what the user sees/inputs in; fxRate: INR per 1 USD
    const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
    const [fxRate, setFxRate] = useState(84); // ₹ per $ by default

    // Convert helper when switching currency
    const convert = (val: number, from: 'INR' | 'USD', to: 'INR' | 'USD') => {
        if (from === to) return val;
        return from === 'INR' ? val / fxRate : val * fxRate;
    };

    // ================== Compound Interest ==================
    const [principal, setPrincipal] = useState(100000);
    const [monthlyContribution, setMonthlyContribution] = useState(50000);
    const [annualReturn, setAnnualReturn] = useState(12);
    const [years, setYears] = useState(20);
    const [inflationRate, setInflationRate] = useState(6);

    const compoundData = useMemo(() => {
        const monthlyRate = annualReturn / 100 / 12;
        const months = years * 12;
        const data: any[] = [];
        let balance = principal;
        let totalContributions = principal;

        for (let month = 0; month <= months; month++) {
            if (month > 0) {
                balance = balance * (1 + monthlyRate) + monthlyContribution;
                totalContributions += monthlyContribution;
            }
            if (month % 12 === 0) {
                const year = Math.floor(month / 12);
                const inflationAdjusted = balance / Math.pow(1 + inflationRate / 100, year);
                data.push({
                    year,
                    balance: Math.max(0, Math.round(balance)),
                    contributions: Math.max(0, Math.round(totalContributions)),
                    inflationAdjusted: Math.max(0, Math.round(inflationAdjusted)),
                    interest: Math.max(0, Math.round(balance - totalContributions)),
                });
            }
        }
        return data;
    }, [principal, monthlyContribution, annualReturn, years, inflationRate]);

    const finalAmount = compoundData.at(-1)?.balance || 0;
    const totalContributed = compoundData.at(-1)?.contributions || 0;
    const totalInterest = Math.max(0, finalAmount - totalContributed);

    // ================== FIRE ==================
    const [currentAge, setCurrentAge] = useState(25);
    const [retirementAge, setRetirementAge] = useState(45);
    const [currentSavings, setCurrentSavings] = useState(500000);
    const [monthlyExpenses, setMonthlyExpenses] = useState(100000);
    const [monthlySavings, setMonthlySavings] = useState(150000);

    const fire = useMemo(() => {
        const fireNumber = monthlyExpenses * 12 * 25; // 25x annual expenses
        const yearsToRetirement = Math.max(0, retirementAge - currentAge);
        const monthlyRate = annualReturn / 100 / 12;
        const months = yearsToRetirement * 12;

        const data: any[] = [];
        let balance = currentSavings;

        for (let month = 0; month <= months; month++) {
            if (month > 0) {
                balance = balance * (1 + monthlyRate) + monthlySavings;
            }
            if (month % 12 === 0) {
                const age = currentAge + Math.floor(month / 12);
                const percentToFIRE = (balance / fireNumber) * 100;
                data.push({
                    age,
                    netWorth: Math.max(0, Math.round(balance)),
                    fireNumber: Math.max(0, Math.round(fireNumber)),
                    percentToFIRE: Math.min(Math.max(0, percentToFIRE), 100),
                });
            }
        }
        return { data, fireNumber };
    }, [monthlyExpenses, retirementAge, currentAge, annualReturn, currentSavings, monthlySavings]);

    // ================== SIP ==================
    const [sipMonthly, setSipMonthly] = useState(30000);
    const [sipYears, setSipYears] = useState(15);
    const [sipAnnualReturn, setSipAnnualReturn] = useState(12);

    const sipData = useMemo(() => {
        const monthlyRate = sipAnnualReturn / 100 / 12;
        const months = sipYears * 12;
        const data: any[] = [];
        let balance = 0;
        let invested = 0;

        for (let m = 0; m <= months; m++) {
            if (m > 0) {
                balance = balance * (1 + monthlyRate) + sipMonthly;
                invested += sipMonthly;
            }
            if (m % 12 === 0) {
                const year = Math.floor(m / 12);
                data.push({
                    year,
                    balance: Math.max(0, Math.round(balance)),
                    invested: Math.max(0, Math.round(invested)),
                    returns: Math.max(0, Math.round(balance - invested)),
                });
            }
        }
        return data;
    }, [sipMonthly, sipYears, sipAnnualReturn]);

    const sipFinal = sipData.at(-1)?.balance || 0;
    const sipInvested = sipData.at(-1)?.invested || 0;
    const sipReturns = Math.max(0, sipFinal - sipInvested);

    // ================== Trading (Position Size / R:R) ==================
    const [acctBalance, setAcctBalance] = useState(200000);
    const [riskPct, setRiskPct] = useState(1); // % risk per trade
    const [entry, setEntry] = useState(100);
    const [stop, setStop] = useState(95);
    const [targetRR, setTargetRR] = useState(2); // 2R default

    const riskAmount = useMemo(() => (acctBalance * Math.max(0, riskPct)) / 100, [acctBalance, riskPct]);
    const perUnitRisk = useMemo(() => Math.max(0.0000001, Math.abs(entry - stop)), [entry, stop]);
    const positionSize = useMemo(() => Math.floor(riskAmount / perUnitRisk), [riskAmount, perUnitRisk]);
    const oneR = perUnitRisk;
    const targetPrice = useMemo(() => (entry >= stop ? entry + oneR * targetRR : entry - oneR * targetRR), [entry, stop, targetRR, oneR]);

    const rrTable = useMemo(() => (
        [1, 1.5, 2, 3, 4].map((r) => ({
            r,
            price: entry >= stop ? entry + oneR * r : entry - oneR * r,
            pnl: Math.round((oneR * r - oneR) * positionSize),
        }))
    ), [entry, stop, oneR, positionSize]);

    // ================== Currency switching effect ==================
    const [lastCurrency, setLastCurrency] = useState<'INR' | 'USD'>(currency);
    useEffect(() => {
        if (currency === lastCurrency) return;
        const from = lastCurrency; const to = currency;
        // convert all monetary inputs so displayed numbers stay the same value in the new unit
        setPrincipal((v) => convert(v, from, to));
        setMonthlyContribution((v) => convert(v, from, to));
        setCurrentSavings((v) => convert(v, from, to));
        setMonthlyExpenses((v) => convert(v, from, to));
        setMonthlySavings((v) => convert(v, from, to));
        setSipMonthly((v) => convert(v, from, to));
        setAcctBalance((v) => convert(v, from, to));
        setEntry((v) => convert(v, from, to));
        setStop((v) => convert(v, from, to));
        setLastCurrency(currency);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    // ================== UI ==================
    return (
        <div className="w-full min-h-screen">
            {/* Header */}
            <div className="mb-6 md:mb-8 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 glitch" data-text="FINANCIAL CALCULATORS">
                    &gt; FINANCIAL CALCULATORS
                </h1>
                <p className="text-base md:text-lg text-green-400 opacity-80 max-w-3xl mx-auto leading-relaxed">
                    Choose a calculator from the right. Results appear here.
                </p>
            </div>

            {/* Layout: MAIN on left (2 cols) + SIDEBAR on right (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
                {/* MAIN (span 2) */}
                <main className="lg:col-span-2 space-y-6">
                    {/* Active Calculator Panels */}
                    {activeCalculator === 'compound' && (
                        <div className="space-y-6">
                            <div className="terminal-window w-full">
                                <div className="terminal-header">
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                </div>
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-green-400">COMPOUND INTEREST</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-green-400 mb-2">Initial Investment ({currency})</label>
                                        <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Monthly Investment ({currency})</label>
                                        <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Expected Annual Return (%)</label>
                                        <input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} className="input-terminal w-full" step="0.1" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Investment Period (Years)</label>
                                        <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Inflation Rate (%)</label>
                                        <input type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="input-terminal w-full" step="0.1" />
                                    </div>
                                </div>
                            </div>

                            <div className="terminal-window w-full">
                                <div className="terminal-header">
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                </div>
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 text-green-400">RESULTS</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Final Amount</p>
                                        <p className="text-2xl font-bold text-green-400">{formatMoney(finalAmount, currency)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Total Invested</p>
                                        <p className="text-2xl font-bold text-green-400">{formatMoney(totalContributed, currency)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Total Returns</p>
                                        <p className="text-2xl font-bold text-green-300">{formatMoney(totalInterest, currency)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Return %</p>
                                        <p className="text-2xl font-bold text-green-300">{totalContributed > 0 ? ((totalInterest / totalContributed) * 100).toFixed(1) : '0.0'}%</p>
                                    </div>
                                </div>

                                <div className="h-64 md:h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={compoundData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                                            <XAxis dataKey="year" stroke="#00ff00" />
                                            <YAxis stroke="#00ff00" tickFormatter={(v) => (currency === 'INR' ? `${(v / 100000).toFixed(0)}L` : `${(v / 1000000).toFixed(0)}M`)} />
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff00' }} labelStyle={{ color: '#00ff00' }} itemStyle={{ color: '#00ff00' }} formatter={(val: any) => formatMoney(val, currency)} />
                                            <Area type="monotone" dataKey="contributions" stackId="1" stroke="#00cc00" fill="#00cc00" fillOpacity={0.6} name="Contributions" />
                                            <Area type="monotone" dataKey="interest" stackId="1" stroke="#00ff00" fill="#00ff00" fillOpacity={0.6} name="Interest" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeCalculator === 'fire' && (
                        <div className="space-y-6">
                            <div className="terminal-window w-full">
                                <div className="terminal-header">
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                </div>
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-green-400">FIRE CALCULATOR</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-green-400 mb-2">Current Age</label>
                                        <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Target Retirement Age</label>
                                        <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Current Savings ({currency})</label>
                                        <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Monthly Savings ({currency})</label>
                                        <input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Monthly Expenses ({currency})</label>
                                        <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="terminal-window w-full">
                                <div className="terminal-header">
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                </div>
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 text-green-400">FIRE ANALYSIS</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">FIRE Number (25x)</p>
                                        <p className="text-2xl font-bold text-green-400">{formatMoney(fire.fireNumber, currency)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Years to FIRE</p>
                                        <p className="text-2xl font-bold text-green-400">{Math.max(0, retirementAge - currentAge)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Monthly Passive Income Needed</p>
                                        <p className="text-2xl font-bold text-green-400">{formatMoney(monthlyExpenses, currency)}</p>
                                    </div>
                                </div>
                                <div className="h-64 md:h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={fire.data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                                            <XAxis dataKey="age" stroke="#00ff00" />
                                            <YAxis stroke="#00ff00" tickFormatter={(v) => (currency === 'INR' ? `${(v / 10000000).toFixed(1)}Cr` : `${(v / 1000000).toFixed(1)}M`)} />
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff00' }} labelStyle={{ color: '#00ff00' }} itemStyle={{ color: '#00ff00' }} formatter={(val: any) => formatMoney(val, currency)} />
                                            <Line type="monotone" dataKey="netWorth" stroke="#00ff00" strokeWidth={2} name="Net Worth" dot={false} />
                                            <Line type="monotone" dataKey="fireNumber" stroke="#ff0000" strokeWidth={2} strokeDasharray="5 5" name="FIRE Target" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeCalculator === 'sip' && (
                        <div className="space-y-6">
                            <div className="terminal-window w-full">
                                <div className="terminal-header">
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                </div>
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-green-400">SIP RETURNS</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-green-400 mb-2">Monthly SIP ({currency})</label>
                                        <input type="number" value={sipMonthly} onChange={(e) => setSipMonthly(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Years</label>
                                        <input type="number" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Expected Annual Return (%)</label>
                                        <input type="number" value={sipAnnualReturn} onChange={(e) => setSipAnnualReturn(Number(e.target.value))} className="input-terminal w-full" step="0.1" />
                                    </div>
                                </div>
                            </div>

                            <div className="terminal-window w-full">
                                <div className="terminal-header">
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                </div>
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 text-green-400">RESULTS</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Final Amount</p>
                                        <p className="text-2xl font-bold text-green-400">{formatMoney(sipFinal, currency)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Total Invested</p>
                                        <p className="text-2xl font-bold text-green-400">{formatMoney(sipInvested, currency)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Total Returns</p>
                                        <p className="text-2xl font-bold text-green-300">{formatMoney(sipReturns, currency)}</p>
                                    </div>
                                </div>

                                <div className="h-64 md:h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={sipData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                                            <XAxis dataKey="year" stroke="#00ff00" />
                                            <YAxis stroke="#00ff00" tickFormatter={(v) => (currency === 'INR' ? `${(v / 100000).toFixed(0)}L` : `${(v / 1000000).toFixed(0)}M`)} />
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff00' }} labelStyle={{ color: '#00ff00' }} itemStyle={{ color: '#00ff00' }} formatter={(val: any) => formatMoney(val, currency)} />
                                            <Area type="monotone" dataKey="invested" stackId="1" stroke="#00cc00" fill="#00cc00" fillOpacity={0.6} name="Invested" />
                                            <Area type="monotone" dataKey="returns" stackId="1" stroke="#00ff00" fill="#00ff00" fillOpacity={0.6} name="Returns" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeCalculator === 'trading' && (
                        <div className="space-y-6">
                            <div className="terminal-window w-full">
                                <div className="terminal-header">
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                </div>
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-green-400">TRADING: POSITION SIZE & R:R</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-green-400 mb-2">Account Balance ({currency})</label>
                                        <input type="number" value={acctBalance} onChange={(e) => setAcctBalance(Number(e.target.value))} className="input-terminal w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Risk per Trade (%)</label>
                                        <input type="number" value={riskPct} onChange={(e) => setRiskPct(Number(e.target.value))} className="input-terminal w-full" step={0.1} />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Entry Price ({currency})</label>
                                        <input type="number" value={entry} onChange={(e) => setEntry(Number(e.target.value))} className="input-terminal w-full" step={0.01} />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Stop Loss ({currency})</label>
                                        <input type="number" value={stop} onChange={(e) => setStop(Number(e.target.value))} className="input-terminal w-full" step={0.01} />
                                    </div>
                                    <div>
                                        <label className="block text-green-400 mb-2">Target R Multiple</label>
                                        <input type="number" value={targetRR} onChange={(e) => setTargetRR(Number(e.target.value))} className="input-terminal w-full" step={0.5} />
                                    </div>
                                </div>
                            </div>

                            <div className="terminal-window w-full">
                                <div className="terminal-header">
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                    <span className="terminal-dot"></span>
                                </div>
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 text-green-400">OUTPUT</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Risk Amount</p>
                                        <p className="text-2xl font-bold text-green-400">{formatMoney(Math.round(riskAmount), currency)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Per Unit Risk</p>
                                        <p className="text-2xl font-bold text-green-400">{formatMoney(oneR, currency)}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Position Size</p>
                                        <p className="text-2xl font-bold text-green-300">{positionSize.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="card-terminal text-center">
                                        <p className="text-sm text-green-400/60 mb-1">Target Price ({targetRR}R)</p>
                                        <p className="text-2xl font-bold text-green-300">{formatMoney(targetPrice, currency)}</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-green-400/90">
                                        <thead>
                                            <tr className="border-b border-green-800">
                                                <th className="py-2">R Multiple</th>
                                                <th className="py-2">Price</th>
                                                <th className="py-2">Approx. P&L</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rrTable.map((row) => (
                                                <tr key={row.r} className="border-b border-green-900/40">
                                                    <td className="py-2">{row.r}R</td>
                                                    <td className="py-2">{formatMoney(row.price, currency)}</td>
                                                    <td className="py-2">{formatMoney(row.pnl, currency)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-xs text-green-400/60 mt-2">P&L assumes full exit at the listed R multiple and ignores fees/slippage.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pro Tips */}
                    <div className="mt-2 border-2 border-green-400 p-6 rounded-lg w-full">
                        <div className="flex items-start gap-4">
                            <Info className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-green-400 mb-4">PRO TIPS</h3>
                                <ul className="space-y-3 text-green-400/80 text-sm md:text-base">
                                    <li>&gt; Start early to maximize compounding.</li>
                                    <li>&gt; Increase investments as income grows.</li>
                                    <li>&gt; 4% withdrawal rate is a common FIRE rule-of-thumb.</li>
                                    <li>&gt; Always factor inflation for long horizons.</li>
                                    <li>&gt; Diversify across equity, debt, and international markets.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

                {/* SIDEBAR on the RIGHT: Calculator List + Settings */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        {/* Calculator Selector */}
                        <div className="terminal-window w-full">
                            <div className="terminal-header">
                                <span className="terminal-dot"></span>
                                <span className="terminal-dot"></span>
                                <span className="terminal-dot"></span>
                            </div>
                            <h2 className="text-xl font-bold mb-4 text-green-400">Calculators</h2>
                            <div className="grid grid-cols-1 gap-3">
                                <button onClick={() => setActiveCalculator('compound')} className={`card-terminal cursor-pointer transition-all text-left ${activeCalculator === 'compound' ? 'border-green-300 bg-green-900/20' : ''}`}>
                                    <div className="flex items-center gap-3"><TrendingUp className="w-5 h-5 text-green-400" /><span className="font-semibold text-green-400">Compound Interest</span></div>
                                    <p className="text-xs text-green-400/60 mt-1">Calculate wealth growth</p>
                                </button>
                                <button onClick={() => setActiveCalculator('fire')} className={`card-terminal cursor-pointer transition-all text-left ${activeCalculator === 'fire' ? 'border-green-300 bg-green-900/20' : ''}`}>
                                    <div className="flex items-center gap-3"><Target className="w-5 h-5 text-green-400" /><span className="font-semibold text-green-400">FIRE</span></div>
                                    <p className="text-xs text-green-400/60 mt-1">Plan early retirement</p>
                                </button>
                                <button onClick={() => setActiveCalculator('sip')} className={`card-terminal cursor-pointer transition-all text-left ${activeCalculator === 'sip' ? 'border-green-300 bg-green-900/20' : ''}`}>
                                    <div className="flex items-center gap-3"><PiggyBank className="w-5 h-5 text-green-400" /><span className="font-semibold text-green-400">SIP Returns</span></div>
                                    <p className="text-xs text-green-400/60 mt-1">Mutual fund projections</p>
                                </button>
                                <button onClick={() => setActiveCalculator('trading')} className={`card-terminal cursor-pointer transition-all text-left ${activeCalculator === 'trading' ? 'border-green-300 bg-green-900/20' : ''}`}>
                                    <div className="flex items-center gap-3"><BarChart3 className="w-5 h-5 text-green-400" /><span className="font-semibold text-green-400">Trading (Risk & Size)</span></div>
                                    <p className="text-xs text-green-400/60 mt-1">Position sizing & R:R</p>
                                </button>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="terminal-window w-full">
                            <div className="terminal-header">
                                <span className="terminal-dot"></span>
                                <span className="terminal-dot"></span>
                                <span className="terminal-dot"></span>
                            </div>
                            <h2 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2"><Settings className="w-5 h-5" /> Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-green-400 mb-2">Currency</label>
                                    <div className="flex items-center gap-3">
                                        <label className="inline-flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="currency" checked={currency === 'INR'} onChange={() => setCurrency('INR')} />
                                            <span className="text-green-400">₹ INR</span>
                                        </label>
                                        <label className="inline-flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="currency" checked={currency === 'USD'} onChange={() => setCurrency('USD')} />
                                            <span className="text-green-400">$ USD</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-green-400 mb-2">FX Rate (₹ per $)</label>
                                    <input type="number" value={fxRate} onChange={(e) => setFxRate(Math.max(0.0001, Number(e.target.value)))} className="input-terminal w-full" step={0.01} />
                                    <p className="text-xs text-green-400/60 mt-1">Switching currency converts all current inputs using this rate.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

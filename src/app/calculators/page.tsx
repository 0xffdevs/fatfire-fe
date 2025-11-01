/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PiggyBank, Target, BarChart3, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function CalculatorsPage() {
    const [activeCalculator, setActiveCalculator] = useState('compound');

    // Compound Interest Calculator State
    const [principal, setPrincipal] = useState(100000);
    const [monthlyContribution, setMonthlyContribution] = useState(50000);
    const [annualReturn, setAnnualReturn] = useState(12);
    const [years, setYears] = useState(20);
    const [inflationRate, setInflationRate] = useState(6);

    // FIRE Calculator State
    const [currentAge, setCurrentAge] = useState(25);
    const [retirementAge, setRetirementAge] = useState(45);
    const [currentSavings, setCurrentSavings] = useState(500000);
    const [monthlyExpenses, setMonthlyExpenses] = useState(100000);
    const [monthlySavings, setMonthlySavings] = useState(150000);

    // Calculate Compound Interest
    const calculateCompoundInterest = () => {
        const monthlyRate = annualReturn / 100 / 12;
        const months = years * 12;
        const data = [];
        let balance = principal;
        let totalContributions = principal;

        for (let month = 0; month <= months; month++) {
            if (month > 0) {
                balance = balance * (1 + monthlyRate) + monthlyContribution;
                totalContributions += monthlyContribution;
            }

            if (month % 12 === 0) {
                const year = month / 12;
                const inflationAdjusted = balance / Math.pow(1 + inflationRate / 100, year);
                data.push({
                    year,
                    balance: Math.round(balance),
                    contributions: Math.round(totalContributions),
                    inflationAdjusted: Math.round(inflationAdjusted),
                    interest: Math.round(balance - totalContributions),
                });
            }
        }

        return data;
    };

    // Calculate FIRE Number
    const calculateFIRE = () => {
        const fireNumber = monthlyExpenses * 12 * 25; // 25x annual expenses
        const yearsToRetirement = retirementAge - currentAge;
        const monthlyRate = annualReturn / 100 / 12;
        const months = yearsToRetirement * 12;

        const data = [];
        let balance = currentSavings;

        for (let month = 0; month <= months; month++) {
            if (month > 0) {
                balance = balance * (1 + monthlyRate) + monthlySavings;
            }

            if (month % 12 === 0) {
                const age = currentAge + month / 12;
                const percentToFIRE = (balance / fireNumber) * 100;
                data.push({
                    age,
                    netWorth: Math.round(balance),
                    fireNumber: fireNumber,
                    percentToFIRE: Math.min(percentToFIRE, 100),
                });
            }
        }

        return { data, fireNumber };
    };

    const compoundData = calculateCompoundInterest();
    const fireData = calculateFIRE();

    const finalAmount = compoundData[compoundData.length - 1]?.balance || 0;
    const totalContributed = compoundData[compoundData.length - 1]?.contributions || 0;
    const totalInterest = finalAmount - totalContributed;

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 glitch" data-text="FINANCIAL CALCULATORS">
                    &gt; FINANCIAL CALCULATORS
                </h1>
                <p className="text-green-400 opacity-80">
                    Plan your path to financial independence with precision
                </p>
            </div>

            {/* Calculator Selector */}
            <div className="terminal-window mb-8 pt-12">
                <div className="terminal-header">
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => setActiveCalculator('compound')}
                        className={`card-terminal cursor-pointer transition-all ${activeCalculator === 'compound' ? 'border-green-300 bg-green-900 bg-opacity-20' : ''
                            }`}
                    >
                        <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                        <h3 className="font-bold text-green-400">Compound Interest</h3>
                        <p className="text-xs text-green-400 opacity-60 mt-1">Calculate wealth growth</p>
                    </button>

                    <button
                        onClick={() => setActiveCalculator('fire')}
                        className={`card-terminal cursor-pointer transition-all ${activeCalculator === 'fire' ? 'border-green-300 bg-green-900 bg-opacity-20' : ''
                            }`}
                    >
                        <Target className="w-8 h-8 text-green-400 mb-2" />
                        <h3 className="font-bold text-green-400">FIRE Calculator</h3>
                        <p className="text-xs text-green-400 opacity-60 mt-1">Plan early retirement</p>
                    </button>

                    <button
                        onClick={() => setActiveCalculator('sip')}
                        className={`card-terminal cursor-pointer transition-all ${activeCalculator === 'sip' ? 'border-green-300 bg-green-900 bg-opacity-20' : ''
                            }`}
                    >
                        <PiggyBank className="w-8 h-8 text-green-400 mb-2" />
                        <h3 className="font-bold text-green-400">SIP Returns</h3>
                        <p className="text-xs text-green-400 opacity-60 mt-1">Mutual fund projections</p>
                    </button>
                </div>
            </div>

            {/* Compound Interest Calculator */}
            {activeCalculator === 'compound' && (
                <div className="space-y-6">
                    <div className="terminal-window pt-12">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        <h2 className="text-2xl font-bold mb-6 text-green-400">COMPOUND INTEREST CALCULATOR</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-green-400 mb-2">Initial Investment (₹)</label>
                                <input
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(Number(e.target.value))}
                                    className="input-terminal w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 mb-2">Monthly Investment (₹)</label>
                                <input
                                    type="number"
                                    value={monthlyContribution}
                                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                    className="input-terminal w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 mb-2">Expected Annual Return (%)</label>
                                <input
                                    type="number"
                                    value={annualReturn}
                                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                                    className="input-terminal w-full"
                                    step="0.1"
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 mb-2">Investment Period (Years)</label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="input-terminal w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 mb-2">Inflation Rate (%)</label>
                                <input
                                    type="number"
                                    value={inflationRate}
                                    onChange={(e) => setInflationRate(Number(e.target.value))}
                                    className="input-terminal w-full"
                                    step="0.1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="terminal-window pt-12">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        <h3 className="text-xl font-bold mb-6 text-green-400">RESULTS</h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="card-terminal text-center">
                                <p className="text-sm text-green-400 opacity-60 mb-1">Final Amount</p>
                                <p className="text-2xl font-bold text-green-400">
                                    ₹{finalAmount.toLocaleString('en-IN')}
                                </p>
                            </div>

                            <div className="card-terminal text-center">
                                <p className="text-sm text-green-400 opacity-60 mb-1">Total Invested</p>
                                <p className="text-2xl font-bold text-green-400">
                                    ₹{totalContributed.toLocaleString('en-IN')}
                                </p>
                            </div>

                            <div className="card-terminal text-center">
                                <p className="text-sm text-green-400 opacity-60 mb-1">Total Returns</p>
                                <p className="text-2xl font-bold text-green-300">
                                    ₹{totalInterest.toLocaleString('en-IN')}
                                </p>
                            </div>

                            <div className="card-terminal text-center">
                                <p className="text-sm text-green-400 opacity-60 mb-1">Return %</p>
                                <p className="text-2xl font-bold text-green-300">
                                    {((totalInterest / totalContributed) * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="h-64 md:h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={compoundData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                                    <XAxis dataKey="year" stroke="#00ff00" />
                                    <YAxis stroke="#00ff00" tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff00' }}
                                        labelStyle={{ color: '#00ff00' }}
                                        itemStyle={{ color: '#00ff00' }}
                                        formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="contributions"
                                        stackId="1"
                                        stroke="#00cc00"
                                        fill="#00cc00"
                                        fillOpacity={0.6}
                                        name="Contributions"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="interest"
                                        stackId="1"
                                        stroke="#00ff00"
                                        fill="#00ff00"
                                        fillOpacity={0.6}
                                        name="Interest"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* FIRE Calculator */}
            {activeCalculator === 'fire' && (
                <div className="space-y-6">
                    <div className="terminal-window pt-12">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        <h2 className="text-2xl font-bold mb-6 text-green-400">FIRE CALCULATOR</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-green-400 mb-2">Current Age</label>
                                <input
                                    type="number"
                                    value={currentAge}
                                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                                    className="input-terminal w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 mb-2">Target Retirement Age</label>
                                <input
                                    type="number"
                                    value={retirementAge}
                                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                                    className="input-terminal w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 mb-2">Current Savings (₹)</label>
                                <input
                                    type="number"
                                    value={currentSavings}
                                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                                    className="input-terminal w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 mb-2">Monthly Savings (₹)</label>
                                <input
                                    type="number"
                                    value={monthlySavings}
                                    onChange={(e) => setMonthlySavings(Number(e.target.value))}
                                    className="input-terminal w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 mb-2">Monthly Expenses (₹)</label>
                                <input
                                    type="number"
                                    value={monthlyExpenses}
                                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                    className="input-terminal w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* FIRE Results */}
                    <div className="terminal-window pt-12">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        <h3 className="text-xl font-bold mb-6 text-green-400">FIRE ANALYSIS</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="card-terminal text-center">
                                <p className="text-sm text-green-400 opacity-60 mb-1">FIRE Number (25x)</p>
                                <p className="text-2xl font-bold text-green-400">
                                    ₹{(fireData.fireNumber / 10000000).toFixed(2)} Cr
                                </p>
                            </div>

                            <div className="card-terminal text-center">
                                <p className="text-sm text-green-400 opacity-60 mb-1">Years to FIRE</p>
                                <p className="text-2xl font-bold text-green-400">
                                    {retirementAge - currentAge}
                                </p>
                            </div>

                            <div className="card-terminal text-center">
                                <p className="text-sm text-green-400 opacity-60 mb-1">Monthly Passive Income Needed</p>
                                <p className="text-2xl font-bold text-green-400">
                                    ₹{monthlyExpenses.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>

                        {/* Progress Chart */}
                        <div className="h-64 md:h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={fireData.data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                                    <XAxis dataKey="age" stroke="#00ff00" />
                                    <YAxis stroke="#00ff00" tickFormatter={(value) => `${(value / 10000000).toFixed(1)}Cr`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff00' }}
                                        labelStyle={{ color: '#00ff00' }}
                                        itemStyle={{ color: '#00ff00' }}
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="netWorth"
                                        stroke="#00ff00"
                                        strokeWidth={2}
                                        name="Net Worth"
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="fireNumber"
                                        stroke="#ff0000"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        name="FIRE Target"
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Tips Section */}
            <div className="mt-12 border-2 border-green-400 p-6">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-green-400 mb-2">PRO TIPS</h3>
                        <ul className="space-y-2 text-green-400 opacity-80 text-sm">
                            <li>&gt; Start investing early to maximize compound interest</li>
                            <li>&gt; Increase investments by 10% yearly as salary grows</li>
                            <li>&gt; Consider 4% withdrawal rate for sustainable retirement</li>
                            <li>&gt; Factor in inflation when planning long-term</li>
                            <li>&gt; Diversify across equity, debt, and international markets</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useState } from 'react';
import {
    TrendingUp, BarChart3, Info
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Area, AreaChart
} from 'recharts';

/* ----------------------------- Currency utils ----------------------------- */

type Currency = 'INR' | 'USD';

function formatMoney(n: number, cur: Currency) {
    if (cur === 'INR') return `₹${(n || 0).toLocaleString('en-IN')}`;
    return `$${(n || 0).toLocaleString('en-US')}`;
}

function axisTick(n: number, cur: Currency) {
    if (cur === 'INR') {
        if (Math.abs(n) >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
        if (Math.abs(n) >= 1e5) return `${(n / 1e5).toFixed(0)}L`;
        return `${(n / 1e3).toFixed(0)}K`;
    } else {
        if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
        if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
        if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
        return `${n}`;
    }
}

/* ----------------------------- Page ----------------------------- */

export default function CalculatorsPage() {
    const calculators = [
        { key: 'compound', label: 'Compound Interest', icon: TrendingUp },
        { key: 'expectancy', label: 'Trading Expectancy', icon: BarChart3 },
    ] as const;

    const [activeKey, setActiveKey] =
        useState<(typeof calculators)[number]['key']>('compound');

    const [currency, setCurrency] = useState<Currency>('INR');

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
            {/* Sidebar */}
            <aside className="space-y-3">
                <div className="terminal-window">
                    <div className="terminal-header">
                        <span className="terminal-dot"></span>
                        <span className="terminal-dot"></span>
                        <span className="terminal-dot"></span>
                    </div>
                    <h2 className="text-green-300 font-bold px-4 pt-4 pb-2">CALCULATORS</h2>
                    <div className="p-4 space-y-2">
                        {calculators.map(({ key, label, icon: Icon }) => {
                            const active = key === activeKey;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveKey(key)}
                                    className={`w-full text-left card-terminal cursor-pointer transition-all ${active ? 'border-green-300 bg-green-900/20' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 font-semibold">{label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* NOTE: If you want to show "add more calculators" help again,
           restore a small card here. Keeping it removed as requested. */}
            </aside>

            {/* Main */}
            <main>
                <header className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 glitch" data-text="FINANCIAL CALCULATORS">
                            &gt; FINANCIAL CALCULATORS
                        </h1>
                        <p className="text-green-400 opacity-80">
                            Plan your path to financial independence with precision
                        </p>
                    </div>

                    {/* Currency Toggle */}
                    <div className="terminal-window min-w-[220px]">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>
                        <div className="p-4">
                            <label className="block text-green-400 mb-2">Currency</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrency('INR')}
                                    className={`btn-terminal text-sm ${currency === 'INR' ? 'border-green-300 bg-green-900/20' : ''}`}
                                >
                                    ₹ INR
                                </button>
                                <button
                                    onClick={() => setCurrency('USD')}
                                    className={`btn-terminal text-sm ${currency === 'USD' ? 'border-green-300 bg-green-900/20' : ''}`}
                                >
                                    $ USD
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {activeKey === 'compound' ? <CompoundCalculator currency={currency} /> : null}
                {activeKey === 'expectancy' ? <ExpectancyCalculator currency={currency} /> : null}
            </main>
        </div>
    );
}

/* -------------------- Compound Interest (with timing + inflation) -------------------- */

function CompoundCalculator({ currency }: { currency: Currency }) {
    // Inputs
    const [principal, setPrincipal] = useState(100000);
    const [monthlyContribution, setMonthlyContribution] = useState(50000);
    const [annualReturn, setAnnualReturn] = useState(12);   // Nominal annual (%)
    const [years, setYears] = useState(20);
    const [inflationRate, setInflationRate] = useState(6);  // Annual inflation (%)
    const [contribTiming, setContribTiming] = useState<'end' | 'start'>('end'); // NEW

    const result = useMemo(() => {
        const months = years * 12;

        // Monthly nominal & inflation rates
        const nominalMonthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
        const inflationMonthlyRate = Math.pow(1 + inflationRate / 100, 1 / 12) - 1;

        // Real monthly rate (Fisher, monthly)
        const realMonthlyRate = (1 + nominalMonthlyRate) / (1 + inflationMonthlyRate) - 1;

        const data: Array<{
            year: number;
            nominalBalance: number;
            contributions: number;
            nominalInterest: number;
            realBalance: number;
        }> = [];

        let nominalBalance = principal;
        let totalContrib = principal;
        let realBalance = principal;

        for (let month = 0; month <= months; month++) {
            if (month > 0) {
                if (contribTiming === 'start') {
                    nominalBalance += monthlyContribution;
                    realBalance += monthlyContribution;
                    totalContrib += monthlyContribution;
                }

                // growth
                nominalBalance *= 1 + nominalMonthlyRate;
                realBalance *= 1 + realMonthlyRate;

                if (contribTiming === 'end') {
                    nominalBalance += monthlyContribution;
                    realBalance += monthlyContribution;
                    totalContrib += monthlyContribution;
                }
            }

            if (month % 12 === 0) {
                const year = month / 12;
                data.push({
                    year,
                    nominalBalance: Math.round(nominalBalance),
                    contributions: Math.round(totalContrib),
                    nominalInterest: Math.round(nominalBalance - totalContrib),
                    realBalance: Math.round(realBalance),
                });
            }
        }

        const last = data[data.length - 1] ?? {
            nominalBalance: 0, contributions: 0, nominalInterest: 0, realBalance: 0,
        };

        return {
            data,
            nominalFinal: last.nominalBalance,
            realFinal: last.realBalance,
            contributions: last.contributions,
            nominalInterest: last.nominalInterest,
            realInterest: last.realBalance - last.contributions,
        };
    }, [principal, monthlyContribution, annualReturn, years, inflationRate, contribTiming]);

    const {
        data: compoundData,
        nominalFinal, realFinal,
        contributions, nominalInterest, realInterest
    } = result;

    return (
        <div className="space-y-6">
            <div className="terminal-window pt-12">
                <div className="terminal-header">
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-green-400">COMPOUND INTEREST (Nominal vs Real)</h2>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <NumberInput label={`Initial Investment (${currency === 'INR' ? '₹' : '$'})`} value={principal} onChange={setPrincipal} />
                    <NumberInput label={`Monthly Investment (${currency === 'INR' ? '₹' : '$'})`} value={monthlyContribution} onChange={setMonthlyContribution} />
                    <NumberInput label="Expected Annual Return (%)" value={annualReturn} onChange={setAnnualReturn} step={0.1} />
                    <NumberInput label="Investment Period (Years)" value={years} onChange={setYears} />
                    <NumberInput label="Inflation Rate (% p.a.)" value={inflationRate} onChange={setInflationRate} step={0.1} />

                    {/* Contribution timing toggle */}
                    <div>
                        <label className="block text-green-400 mb-2">Contribution Timing</label>
                        <div className="flex gap-2">
                            <button
                                className={`btn-terminal text-sm ${contribTiming === 'end' ? 'border-green-300 bg-green-900/20' : ''}`}
                                onClick={() => setContribTiming('end')}
                            >
                                End of month
                            </button>
                            <button
                                className={`btn-terminal text-sm ${contribTiming === 'start' ? 'border-green-300 bg-green-900/20' : ''}`}
                                onClick={() => setContribTiming('start')}
                            >
                                Start of month
                            </button>
                        </div>
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

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <StatCard label={`Final Amount (Nominal)`} value={formatMoney(nominalFinal, currency)} />
                    <StatCard label={`Final Amount (Real, today ${currency === 'INR' ? '₹' : '$'})`} value={formatMoney(realFinal, currency)} />
                    <StatCard label="Total Invested" value={formatMoney(contributions, currency)} />
                    <StatCard label="Returns (Nominal)" value={formatMoney(nominalInterest, currency)} emphasis />
                    <StatCard label="Returns (Real)" value={formatMoney(realInterest, currency)} emphasis />
                </div>

                {/* Chart */}
                <div className="h-64 md:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={compoundData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                            <XAxis dataKey="year" stroke="#00ff00" />
                            <YAxis stroke="#00ff00" tickFormatter={(v) => axisTick(v, currency)} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff00' }}
                                labelStyle={{ color: '#00ff00' }}
                                itemStyle={{ color: '#00ff00' }}
                                formatter={(value: any) => formatMoney(value as number, currency)}
                            />
                            <Area
                                type="monotone"
                                dataKey="contributions"
                                stackId="1"
                                stroke="#00cc00"
                                fill="#00cc00"
                                fillOpacity={0.5}
                                name="Contributions"
                            />
                            <Area
                                type="monotone"
                                dataKey="nominalInterest"
                                stackId="1"
                                stroke="#00ff00"
                                fill="#00ff00"
                                fillOpacity={0.5}
                                name="Interest (Nominal)"
                            />
                            <Line
                                type="monotone"
                                dataKey="realBalance"
                                stroke="#66ff66"
                                strokeWidth={2}
                                dot={false}
                                name="Balance (Real)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <Tips />
        </div>
    );
}

/* -------------------------- Trading Expectancy -------------------------- */

function ExpectancyCalculator({ currency }: { currency: Currency }) {
    // Inputs
    const [capital, setCapital] = useState(1_000_000);
    const [riskPct, setRiskPct] = useState(1);
    const [rr, setRR] = useState(2.0);
    const [winRate, setWinRate] = useState(50);
    const [tradesPerMonth, setTradesPerMonth] = useState(20);

    const calc = useMemo(() => {
        const w = Math.min(Math.max(winRate / 100, 0), 1);
        const riskAmount = capital * (riskPct / 100);
        const expectancyR = w * rr - (1 - w) * 1;       // in R per trade
        const expectancyPerTrade = expectancyR * riskAmount;
        const expectedMonthlyProfit = expectancyPerTrade * tradesPerMonth;
        const expectedMonthlyROI = (expectedMonthlyProfit / capital) * 100;

        // 12-month compounding projection
        const months = 12;
        const series: Array<{ month: number; equity: number; profit: number }> = [];
        let equity = capital;
        for (let m = 1; m <= months; m++) {
            const riskAmt = equity * (riskPct / 100);
            const monthlyExp = (w * rr - (1 - w)) * riskAmt * tradesPerMonth;
            equity += monthlyExp;
            series.push({ month: m, equity: Math.round(equity), profit: Math.round(monthlyExp) });
        }

        return {
            riskAmount,
            expectancyR,
            expectancyPerTrade,
            expectedMonthlyProfit,
            expectedMonthlyROI,
            series,
        };
    }, [capital, riskPct, rr, winRate, tradesPerMonth]);

    return (
        <div className="space-y-6">
            <div className="terminal-window pt-12">
                <div className="terminal-header">
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-green-400">TRADING EXPECTANCY</h2>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <NumberInput label={`Total Capital (${currency === 'INR' ? '₹' : '$'})`} value={capital} onChange={setCapital} />
                    <NumberInput label="Risk per Trade (% of capital)" value={riskPct} onChange={setRiskPct} step={0.1} />
                    <NumberInput label="R:R Ratio (Reward:Risk)" value={rr} onChange={setRR} step={0.1} />
                    <NumberInput label="Win Rate (%)" value={winRate} onChange={setWinRate} step={0.1} />
                    <NumberInput label="Trades per Month" value={tradesPerMonth} onChange={setTradesPerMonth} />
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

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <StatCard label="Risk / Trade" value={formatMoney(calc.riskAmount, currency)} />
                    <StatCard label="Expectancy (R / trade)" value={calc.expectancyR.toFixed(3)} />
                    <StatCard label={`Expectancy (${currency === 'INR' ? '₹' : '$'} / trade)`} value={formatMoney(calc.expectancyPerTrade, currency)} />
                    <StatCard label="Expected Profit / Month" value={formatMoney(calc.expectedMonthlyProfit, currency)} emphasis />
                    <StatCard label="Expected ROI / Month" value={`${calc.expectedMonthlyROI.toFixed(2)}%`} emphasis />
                </div>

                {/* Chart */}
                <div className="h-64 md:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={calc.series}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                            <XAxis dataKey="month" stroke="#00ff00" />
                            <YAxis stroke="#00ff00" tickFormatter={(v) => axisTick(v, currency)} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff00' }}
                                labelStyle={{ color: '#00ff00' }}
                                itemStyle={{ color: '#00ff00' }}
                                formatter={(value: any) => formatMoney(value as number, currency)}
                            />
                            <Line
                                type="monotone"
                                dataKey="equity"
                                stroke="#00ff00"
                                strokeWidth={2}
                                dot={false}
                                name="Projected Equity (12m)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="border-2 border-green-400 p-6">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-green-400 mb-2">NOTES</h3>
                        <ul className="space-y-2 text-green-400/80 text-sm">
                            <li>&gt; Expectancy per trade (in R): <code className="px-1 rounded bg-green-900/30">w × R − (1 − w) × 1</code></li>
                            <li>&gt; Profit/month = Expectancy/trade × Risk/trade × Trades/month</li>
                            <li>&gt; Projection compounds monthly by re-risking on new equity.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ----------------------------- UI Bits ----------------------------- */

function NumberInput({
    label, value, onChange, step = 1,
}: { label: string; value: number; onChange: (n: number) => void; step?: number }) {
    return (
        <div>
            <label className="block text-green-400 mb-2">{label}</label>
            <input
                type="number"
                value={Number.isFinite(value) ? value : 0}
                onChange={(e) => onChange(Number(e.target.value))}
                className="input-terminal w-full"
                step={step}
            />
        </div>
    );
}

function StatCard({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
    return (
        <div className="card-terminal text-center">
            <p className="text-sm text-green-400 opacity-60 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${emphasis ? 'text-green-300' : 'text-green-400'}`}>{value}</p>
        </div>
    );
}

function Tips() {
    return (
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
    );
}

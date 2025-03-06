// Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, AlertTriangle, TrendingUp, Users, Calendar, Percent, FileText, BarChart, ChevronDown, Check, X } from 'lucide-react';

const CostOfInactionCalculator = () => {
  // Lead generation channels
  const leadGenerationChannels = [
    { id: 1, name: "Referrals and Word-of-Mouth", weight: 10 },
    { id: 2, name: "Search Engine Optimization (SEO) & Google My Business", weight: 9 },
    { id: 3, name: "Social Media Marketing", weight: 8 },
    { id: 4, name: "Website & Content Marketing", weight: 7 },
    { id: 5, name: "Networking & Industry Events", weight: 6 },
    { id: 6, name: "Paid Advertising (Google & Social Ads)", weight: 5 },
    { id: 7, name: "Email Marketing & Retargeting", weight: 4 },
    { id: 8, name: "Lead Aggregators & Directories", weight: 3 },
    { id: 9, name: "Cold Outreach & Prospecting", weight: 2 },
    { id: 10, name: "Community Involvement & Sponsorships", weight: 1 }
  ];
  
  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // State for user inputs
  const [inputs, setInputs] = useState({
    // Lead Generation
    monthlyLeads: 10,
    currentLeadFlowPercentage: 15, // New field for current lead flow percentage
    leadQualityImprovementPercent: 25,
    
    // Sales Process
    currentCloseRate: 20, // Win Rate
    desiredCloseRate: 35,
    averageSalesCycleCurrentDays: 45,
    averageSalesCycleImprovedDays: 30,
    
    // Project Metrics
    averageProjectValue: 50000,
    averageProjectDurationCurrent: 90, // days
    averageProjectDurationImproved: 75, // days
    
    // Financial Metrics
    currentProfitMargin: 20,
    improvedProfitMargin: 35,
    
    // Client Retention
    repeatBusinessRateCurrent: 15,
    repeatBusinessRateImproved: 40,
    
    // Lead channels - track selected channels
    leadChannels: []
  });

  // State for calculated results
  const [results, setResults] = useState({
    currentAnnualRevenue: 0,
    improvedAnnualRevenue: 0,
    annualRevenueDifference: 0,
    lifetimeRevenueDifference: 0,
    opportunityCostPerDay: 0,
    threeMonthCostOfInaction: 0,
    sixMonthCostOfInaction: 0,
    oneYearCostOfInaction: 0,
    timeSavingsHoursPerMonth: 0,
    timeSavingsProjectDuration: 0,
    salesCycleImprovementPercent: 0,
    additionalProjectsPerYear: 0,
    currentAnnualProfit: 0,
    improvedAnnualProfit: 0,
    annualProfitDifference: 0,
    lifetimeProfitDifference: 0,
    dailyProfitDifference: 0,
    channelDiversificationScore: 0,
    channelDiversificationPercentage: 0,
  });

  // Calculate results whenever inputs change
  useEffect(() => {
    // Calculate current vs improved projects per year
    const currentProjectsPerYear = inputs.monthlyLeads * (inputs.currentCloseRate / 100) * 12;
    
    // Use current lead flow percentage and improvement for improved calculation
    const currentLeadFlow = inputs.monthlyLeads * (inputs.currentLeadFlowPercentage / 100);
    const improvedLeadFlow = currentLeadFlow * (1 + inputs.leadQualityImprovementPercent / 100);
    const improvedLeadQuality = inputs.monthlyLeads * (1 + inputs.leadQualityImprovementPercent / 100);
    const improvedProjectsPerYear = improvedLeadQuality * (inputs.desiredCloseRate / 100) * 12;
    
    // Calculate repeat business impact
    const currentRepeatProjects = currentProjectsPerYear * (inputs.repeatBusinessRateCurrent / 100);
    const improvedRepeatProjects = improvedProjectsPerYear * (inputs.repeatBusinessRateImproved / 100);
    
    // Calculate total current and improved projects
    const totalCurrentProjects = currentProjectsPerYear + currentRepeatProjects;
    const totalImprovedProjects = improvedProjectsPerYear + improvedRepeatProjects;
    const additionalProjectsPerYear = totalImprovedProjects - totalCurrentProjects;
    
    // Calculate revenue impact
    const currentAnnualRevenue = totalCurrentProjects * inputs.averageProjectValue;
    const improvedAnnualRevenue = totalImprovedProjects * inputs.averageProjectValue;
    const annualRevenueDifference = improvedAnnualRevenue - currentAnnualRevenue;
    
    // Calculate profit impact
    const currentAnnualProfit = currentAnnualRevenue * (inputs.currentProfitMargin / 100);
    const improvedAnnualProfit = improvedAnnualRevenue * (inputs.improvedProfitMargin / 100);
    const annualProfitDifference = improvedAnnualProfit - currentAnnualProfit;
    const dailyProfitDifference = annualProfitDifference / 365;
    
    // Calculate 5-year impact (lifetime value)
    const lifetimeRevenueDifference = annualRevenueDifference * 5;
    const lifetimeProfitDifference = annualProfitDifference * 5;
    
    // Calculate daily opportunity cost
    const opportunityCostPerDay = annualRevenueDifference / 365;
    
    // Calculate cost of inaction for different timeframes
    const threeMonthCostOfInaction = opportunityCostPerDay * 90;
    const sixMonthCostOfInaction = opportunityCostPerDay * 180;
    const oneYearCostOfInaction = annualRevenueDifference;
    
    // Calculate time savings
    const timeSavingsHoursPerMonth = inputs.monthlyLeads * 2; // Assuming 2 hours saved per lead
    
    // Calculate sales cycle improvement
    const salesCycleImprovementPercent = 
      ((inputs.averageSalesCycleCurrentDays - inputs.averageSalesCycleImprovedDays) / 
      inputs.averageSalesCycleCurrentDays) * 100;
    
    // Calculate project duration improvement
    const timeSavingsProjectDuration = 
      ((inputs.averageProjectDurationCurrent - inputs.averageProjectDurationImproved) / 
      inputs.averageProjectDurationCurrent) * 100;
    
    // Calculate channel diversification score
    const maxPossibleScore = leadGenerationChannels.reduce((sum, channel) => sum + channel.weight, 0);
    const currentScore = inputs.leadChannels.reduce((score, channelId) => {
      const channel = leadGenerationChannels.find(c => c.id === channelId);
      return score + (channel ? channel.weight : 0);
    }, 0);
    
    const channelDiversificationPercentage = (currentScore / maxPossibleScore) * 100;
    
    setResults({
      currentAnnualRevenue,
      improvedAnnualRevenue,
      annualRevenueDifference,
      lifetimeRevenueDifference,
      opportunityCostPerDay,
      threeMonthCostOfInaction,
      sixMonthCostOfInaction,
      oneYearCostOfInaction,
      timeSavingsHoursPerMonth,
      timeSavingsProjectDuration,
      salesCycleImprovementPercent,
      additionalProjectsPerYear,
      currentAnnualProfit,
      improvedAnnualProfit,
      annualProfitDifference,
      lifetimeProfitDifference,
      dailyProfitDifference,
      channelDiversificationScore: currentScore,
      channelDiversificationPercentage
    });
  }, [inputs, leadGenerationChannels]);

  // Toggle channel selection
  const toggleChannel = (channelId) => {
    setInputs(prev => {
      if (prev.leadChannels.includes(channelId)) {
        return {
          ...prev,
          leadChannels: prev.leadChannels.filter(id => id !== channelId)
        };
      } else {
        return {
          ...prev,
          leadChannels: [...prev.leadChannels, channelId]
        };
      }
    });
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cost of Inaction Calculator for Remodelers</h2>
      <p className="text-gray-600 mb-6 text-center">
        Discover how much money you're leaving on the table by not optimizing your lead generation and sales process.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Business Metrics</h3>
          
          <div className="space-y-4">
            {/* Step 1: Monthly Leads */}
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                1. Monthly Leads
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="monthlyLeads"
                  value={inputs.monthlyLeads}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Average number of potential client inquiries per month</p>
            </div>
            
            {/* Lead Channels Multi-Select Dropdown */}
            <div className="border-b pb-3 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                1a. Current Lead Generation Channels
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="block truncate">
                    {inputs.leadChannels.length === 0
                      ? "Select your lead channels..."
                      : `${inputs.leadChannels.length} channel${inputs.leadChannels.length !== 1 ? 's' : ''} selected`}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {leadGenerationChannels.map((channel) => (
                      <div
                        key={channel.id}
                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${
                          inputs.leadChannels.includes(channel.id) ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => toggleChannel(channel.id)}
                      >
                        <div className="flex items-center">
                          <span className="mr-2">
                            {inputs.leadChannels.includes(channel.id) ? (
                              <Check className="h-4 w-4 text-blue-600" />
                            ) : (
                              <div className="h-4 w-4 border border-gray-300 rounded" />
                            )}
                          </span>
                          <span>{channel.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Select all the channels you currently use for lead generation</p>
              
              {/* Channel Score Display */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Lead Channel Diversification:</span>
                  <span className={`font-semibold ${
                    results.channelDiversificationPercentage < 30 ? 'text-red-600' : 
                    results.channelDiversificationPercentage < 60 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {results.channelDiversificationPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div 
                    className={`h-2.5 rounded-full ${
                      results.channelDiversificationPercentage < 30 ? 'bg-red-600' : 
                      results.channelDiversificationPercentage < 60 ? 'bg-yellow-500' : 
                      'bg-green-600'
                    }`} 
                    style={{ width: `${results.channelDiversificationPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Step 2: Lead Flow Conversion (Quality Improvement) */}
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                2. Lead Flow Conversion
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Percent className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="currentLeadFlowPercentage"
                      value={inputs.currentLeadFlowPercentage}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Current %"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current %</p>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="leadQualityImprovementPercent"
                      value={inputs.leadQualityImprovementPercent}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Improvement %"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Improvement %</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Expected improvement in lead quality with GO First's system</p>
            </div>
            
            {/* Step 3: Sales Cycle */}
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                3. Sales Cycle (days)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="averageSalesCycleCurrentDays"
                      value={inputs.averageSalesCycleCurrentDays}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Current"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current</p>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="averageSalesCycleImprovedDays"
                      value={inputs.averageSalesCycleImprovedDays}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Improved"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">With GO First</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Average days from lead to signed contract</p>
            </div>
            
            {/* Step 4: Average Project Value */}
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                4. Average Project Value
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="averageProjectValue"
                  value={inputs.averageProjectValue}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Average revenue from each project</p>
            </div>
            
            {/* Step 5: Average Profit Margin */}
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                5. Average Profit Margin (%)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="currentProfitMargin"
                      value={inputs.currentProfitMargin}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Current"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current</p>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="improvedProfitMargin"
                      value={inputs.improvedProfitMargin}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Improved"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">With GO First</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Net profit as percentage of revenue</p>
            </div>
            
            {/* Step 6: Average Win Rate */}
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                6. Average Win Rate (%)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Percent className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="currentCloseRate"
                      value={inputs.currentCloseRate}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Current"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current</p>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Percent className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="desiredCloseRate"
                      value={inputs.desiredCloseRate}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Improved"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">With GO First</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Percentage of leads that convert to signed projects</p>
            </div>
            
            {/* Step 7: Average Project Duration */}
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                7. Average Project Duration (days)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="averageProjectDurationCurrent"
                      value={inputs.averageProjectDurationCurrent}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Current"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current</p>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="averageProjectDurationImproved"
                      value={inputs.averageProjectDurationImproved}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Improved"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">With GO First</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Average days from start to completion of projects</p>
            </div>
            
            {/* Step 8: Average Client Retention */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                8. Client Retention Rate (%)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="repeatBusinessRateCurrent"
                      value={inputs.repeatBusinessRateCurrent}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Current"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current</p>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="repeatBusinessRateImproved"
                      value={inputs.repeatBusinessRateImproved}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                      placeholder="Improved"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">With GO First</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Percentage of clients that return for additional projects</p>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Cost of Inaction</h3>
          
          <div className="space-y-6">
            <div className="bg-red-100 p-4 rounded-lg border border-red-200 mb-4">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                <div>
                  <h4 className="font-bold text-red-700">DAILY COST OF WAITING</h4>
                  <div className="text-2xl font-bold text-red-800">{formatCurrency(results.opportunityCostPerDay)}</div>
                  <p className="text-sm text-red-600">Potential revenue missed every day</p>
                  <div className="text-xl font-bold text-red-800 mt-2">{formatCurrency(results.dailyProfitDifference)}</div>
                  <p className="text-sm text-red-600">Potential profit missed every day</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700">ANNUAL IMPACT</h4>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Current Annual Revenue</p>
                    <p className="text-lg font-semibold">{formatCurrency(results.currentAnnualRevenue)}</p>
                    <p className="text-sm text-gray-500 mt-1">Current Annual Profit</p>
                    <p className="text-md font-semibold">{formatCurrency(results.currentAnnualProfit)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Improved Annual Revenue</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(results.improvedAnnualRevenue)}</p>
                    <p className="text-sm text-gray-500 mt-1">Improved Annual Profit</p>
                    <p className="text-md font-semibold text-green-600">{formatCurrency(results.improvedAnnualProfit)}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Additional Annual Revenue</p>
                      <p className="text-xl font-bold text-blue-600">{formatCurrency(results.annualRevenueDifference)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Additional Annual Profit</p>
                      <p className="text-xl font-bold text-green-700">{formatCurrency(results.annualProfitDifference)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700">COST OF INACTION</h4>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">3 Months</p>
                    <p className="text-lg font-semibold text-orange-600">{formatCurrency(results.threeMonthCostOfInaction)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">6 Months</p>
                    <p className="text-lg font-semibold text-orange-700">{formatCurrency(results.sixMonthCostOfInaction)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">1 Year</p>
                    <p className="text-lg font-semibold text-red-600">{formatCurrency(results.oneYearCostOfInaction)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700">BUSINESS IMPACT</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Additional Projects Per Year</p>
                    <p className="text-lg font-semibold text-blue-600">{results.additionalProjectsPerYear.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Profit Margin Improvement</p>
                    <p className="text-lg font-semibold text-green-600">{(inputs.improvedProfitMargin - inputs.currentProfitMargin).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sales Cycle Reduction</p>
                    <p className="text-lg font-semibold text-blue-600">{results.salesCycleImprovementPercent.toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Project Duration Reduction</p>
                    <p className="text-lg font-semibold text-blue-600">{results.timeSavingsProjectDuration.toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">5-Year Revenue Increase</p>
                    <p className="text-lg font-semibold text-blue-600">{formatCurrency(results.lifetimeRevenueDifference)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">5-Year Profit Increase</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(results.lifetimeProfitDifference)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700 flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  PROFIT MARGIN COMPARISON
                </h4>
                <div className="mt-3">
                  <div className="text-sm text-gray-600 mb-1">Industry Average: 20%</div>
                  <div className="w-full bg-gray-200 h-6 rounded-full">
                    <div 
                      className="bg-gray-500 h-6 rounded-full text-center text-white text-sm flex items-center justify-center"
                      style={{ width: '20%' }}
                    >
                      20%
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm text-gray-600 mb-1">Your Current Margin: {inputs.currentProfitMargin}%</div>
                  <div className="w-full bg-gray-200 h-6 rounded-full">
                    <div 
                      className={`${inputs.currentProfitMargin < 20 ? 'bg-red-500' : 'bg-yellow-500'} h-6 rounded-full text-center text-white text-sm flex items-center justify-center`}
                      style={{ width: `${inputs.currentProfitMargin}%` }}
                    >
                      {inputs.currentProfitMargin}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm text-gray-600 mb-1">GO First Target Margin: {inputs.improvedProfitMargin}%</div>
                  <div className="w-full bg-gray-200 h-6 rounded-full">
                    <div 
                      className="bg-green-500 h-6 rounded-full text-center text-white text-sm flex items-center justify-center"
                      style={{ width: `${inputs.improvedProfitMargin}%` }}
                    >
                      {inputs.improvedProfitMargin}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <p className="mb-2"><span className="font-semibold">What this means:</span> The typical remodeling business operates at around 20% profit margin. With GO First's systems, you can achieve 35% or higher by:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Attracting higher-value clients willing to pay for quality</li>
                    <li>Reducing wasted time on unqualified leads</li>
                    <li>Streamlining your sales process and reducing costs</li>
                    <li>Positioning your business as a premium solution</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                <h4 className="font-medium text-gray-700 flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  LEAD CHANNEL DIVERSIFICATION
                </h4>
                
                <div className="mt-3">
                  <div className="text-sm text-gray-600 mb-1">Your Score: {results.channelDiversificationPercentage.toFixed(0)}%</div>
                  <div className="w-full bg-gray-200 h-6 rounded-full">
                    <div 
                      className={`h-6 rounded-full text-center text-white text-sm flex items-center justify-center ${
                        results.channelDiversificationPercentage < 30 ? 'bg-red-500' : 
                        results.channelDiversificationPercentage < 60 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${results.channelDiversificationPercentage}%` }}
                    >
                      {results.channelDiversificationPercentage.toFixed(0)}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <p className="mb-2"><span className="font-semibold">What this means:</span> Lead channel diversification measures how well-rounded your lead generation strategy is.</p>
                  
                  {results.channelDiversificationPercentage < 30 ? (
                    <div className="bg-red-50 p-3 rounded border border-red-200 mt-2">
                      <p className="text-red-700 font-medium">High Risk: Limited Lead Sources</p>
                      <p className="text-red-600 text-xs mt-1">Your business is vulnerable to disruptions in your limited lead sources. Adding more diversified channels can protect your revenue from sudden changes in any one channel.</p>
                    </div>
                  ) : results.channelDiversificationPercentage < 60 ? (
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mt-2">
                      <p className="text-yellow-700 font-medium">Moderate Risk: Some Diversification</p>
                      <p className="text-yellow-600 text-xs mt-1">You have some lead channel diversity, but could benefit from adding high-value channels like referrals and SEO to create more stability in your lead flow.</p>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-3 rounded border border-green-200 mt-2">
                      <p className="text-green-700 font-medium">Low Risk: Well-Diversified</p>
                      <p className="text-green-600 text-xs mt-1">You have a healthy mix of lead channels, creating stability and consistent lead flow. Focus on optimizing each channel's performance for even better results.</p>
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <p className="font-medium">Top channels you should consider adding:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1 text-xs">
                      {!inputs.leadChannels.includes(1) && (
                        <li className="text-blue-600 font-medium">Referrals and Word-of-Mouth - The highest-value lead source</li>
                      )}
                      {!inputs.leadChannels.includes(2) && (
                        <li>Search Engine Optimization (SEO) & Google My Business</li>
                      )}
                      {!inputs.leadChannels.includes(3) && (
                        <li>Social Media Marketing</li>
                      )}
                      {!inputs.leadChannels.includes(4) && (
                        <li>Website & Content Marketing</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium cursor-pointer shadow-md transition duration-200">
                Book a Strategy Call to Stop Wasting Money
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          This calculator shows potential revenue based on industry benchmarks. Results may vary based on implementation, 
          market conditions, and other factors. Book a strategy call for a personalized analysis.
        </p>
      </div>
    </div>
  );
};

export default CostOfInactionCalculator;

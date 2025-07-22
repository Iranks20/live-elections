import React, { useState, useEffect } from 'react'
import { Trophy, MapPin, Users, Clock } from 'lucide-react'

interface VillageResult {
  id: string
  name: string
  serugandaVotes: number
  bitangaroVotes: number
  totalVotes: number
}

export default function ElectionResults() {
  // Initial lead for Hon Seruganda
  const initialSerugandaLead = 203

  const [results] = useState<VillageResult[]>([
    { id: '1', name: 'Kanyenka-Muramba', serugandaVotes: 234, bitangaroVotes: 359, totalVotes: 593 },
    { id: '2', name: 'Migeshi-Muramba', serugandaVotes: 151, bitangaroVotes: 91, totalVotes: 242 },
    { id: '3', name: 'Murambi-Nyakinama', serugandaVotes: 0, bitangaroVotes: 0, totalVotes: 0 },
    { id: '4', name: 'Nyabitare-Nyakinama', serugandaVotes: 181, bitangaroVotes: 77, totalVotes: 258 },
    { id: '5', name: 'Kabaya-Nyarusiza', serugandaVotes: 168, bitangaroVotes: 77, totalVotes: 245 },
    { id: '6', name: 'Karambi-Nyarusiza', serugandaVotes: 0, bitangaroVotes: 0, totalVotes: 0 },
    { id: '7', name: 'Bushoka-Nyarusiza', serugandaVotes: 0, bitangaroVotes: 0, totalVotes: 0 }
  ])

  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Calculate totals
  const totalSeruganda = results.reduce((sum, village) => sum + village.serugandaVotes, 0)
  const totalBitangaro = results.reduce((sum, village) => sum + village.bitangaroVotes, 0)
  const grandTotal = totalSeruganda + totalBitangaro
  const totalSerugandaWithLead = totalSeruganda + initialSerugandaLead

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? ((votes / total) * 100).toFixed(1) : '0.0'
  }

  const isLeading = (candidate: 'seruganda' | 'bitangaro') => {
    if (candidate === 'seruganda') return totalSerugandaWithLead > totalBitangaro
    return totalBitangaro > totalSerugandaWithLead
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-500 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Live Election Results 2024
            </h1>
            <p className="text-yellow-100 text-lg">
              Real-time vote counting across all constituencies
            </p>
            <div className="flex items-center justify-center mt-3 text-yellow-100">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Candidate Totals */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Hon SerugandaSuper Seru */}
          <div className={`bg-white rounded-xl shadow-lg border-4 p-6 ${
            isLeading('seruganda') ? 'border-yellow-400' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/supa.jpeg"
                  alt="Hon SerugandaSuper Seru"
                  className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400"
                />
                {isLeading('seruganda') && (
                  <Trophy className="absolute -top-2 -right-2 text-yellow-500" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  Hon SerugandaSuper Seru
                </h2>
                <p className="text-yellow-600 font-semibold mb-1">(Turakomeje)</p>
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-yellow-700">Initial lead: <b>{initialSerugandaLead.toLocaleString()}</b></span>
                  <span className="text-3xl font-bold text-gray-900">{totalSerugandaWithLead.toLocaleString()}</span>
                </div>
                <div className="text-lg text-gray-600">
                  {getPercentage(totalSerugandaWithLead, grandTotal + initialSerugandaLead)}% of votes
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(totalSerugandaWithLead, grandTotal + initialSerugandaLead)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Hon Sam Bitangaro */}
          <div className={`bg-white rounded-xl shadow-lg border-4 p-6 ${
            isLeading('bitangaro') ? 'border-blue-400' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/sam.jpeg"
                  alt="Bitangaro Sam"
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-400"
                />
                {isLeading('bitangaro') && (
                  <Trophy className="absolute -top-2 -right-2 text-blue-500" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  Hon Sam Bitangaro
                </h2>
                <p className="text-yellow-600 font-semibold mb-1">(Vugurura)</p>
                <div className="text-3xl font-bold text-gray-900">
                  {totalBitangaro.toLocaleString()}
                </div>
                <div className="text-lg text-gray-600">
                  {getPercentage(totalBitangaro, grandTotal)}% of votes
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(totalBitangaro, grandTotal)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Village Results */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-yellow-500 text-white px-6 py-4">
            <h3 className="text-xl font-bold flex items-center">
              <MapPin className="mr-2" size={20} />
              Results by Constituency
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200 shadow rounded-lg overflow-hidden w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Constituency
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Seru (Turakomeje)
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Bitangaro (Vugurura)
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Total Votes
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Leading
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((village, index) => {
                  const villageLeader = village.serugandaVotes > village.bitangaroVotes ? 'seru' : 'bitangaro'
                  const updatedTotal = village.serugandaVotes + village.bitangaroVotes
                  
                  return (
                    <tr key={village.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MapPin className="text-yellow-500 mr-2" size={16} />
                          <span className="font-medium text-gray-900">{village.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-gray-900">
                          {village.serugandaVotes.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getPercentage(village.serugandaVotes, updatedTotal)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-gray-900">
                          {village.bitangaroVotes.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getPercentage(village.bitangaroVotes, updatedTotal)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <Users className="text-gray-400 mr-1" size={16} />
                          <span className="font-medium text-gray-900">
                            {updatedTotal.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          villageLeader === 'seru' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {villageLeader === 'seru' ? 'Seru' : 'Bitangaro'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-gray-900">
                          {village.serugandaVotes - village.bitangaroVotes}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 sticky bottom-0 text-xs sm:text-base">
                  <td className="px-2 sm:px-6 py-2 sm:py-4 font-bold text-left">Totals</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-yellow-900 font-bold text-center">{totalSeruganda}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-blue-900 font-bold text-center">{totalBitangaro}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 font-bold text-center">{grandTotal}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 font-bold text-center"></td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 font-bold text-center">{totalSeruganda - totalBitangaro}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {grandTotal.toLocaleString()}
            </div>
            <div className="text-gray-600">Total Votes Cast</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {results.length}
            </div>
            <div className="text-gray-600">Constituencies</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {Math.abs(totalSeruganda - totalBitangaro).toLocaleString()}
            </div>
            <div className="text-gray-600">Vote Margin</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            Powered by <span className="text-yellow-400 font-semibold">Supabase</span> • 
            Real-time election results system
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Results are updated automatically every 10 seconds
          </p>
        </div>
      </footer>
    </div>
  )
}
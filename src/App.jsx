import { useState, useEffect } from 'react';
import { useYears } from './hooks/useYears';
import { usePeriod } from './hooks/usePeriod';
import { usePrograms } from './hooks/usePrograms';
import SearchFilterCard from './components/SearchFilterCard';

const App = () => {
  const { years, yrErr } = useYears();
  const { period, prdErr } = usePeriod();
  const [selectedYearLevel, setSelectedYearLevel] = useState('')
  const [selectedPrd, setSelectedPrd] = useState('')
  const [selectedPrgm, setSelectedPrgm] = useState('')
  const { programs, prgErr, fetchPrograms } = usePrograms()

  useEffect(() => {
    if(selectedYearLevel && selectedPrd){
      fetchPrograms({yearId: selectedYearLevel, periodId: selectedPrd})
    }},[selectedYearLevel, selectedPrd])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <SearchFilterCard 
          years={years} 
          yrErr={yrErr} 
          period={period} 
          prdErr={prdErr}
          slctYr={selectedYearLevel}
          ocSlctYr={setSelectedYearLevel}
          slctPrd={selectedPrd}
          ocSlctPrd={setSelectedPrd}
          programList={programs}
          prgmErr={prgErr}
          slctPrgm={selectedPrgm}
          ocSlctPrgm={setSelectedPrgm}
        />
      </div>
    </div>
  )
}

export default App;
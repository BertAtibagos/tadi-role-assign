import { useState, useEffect } from 'react';
import { useYears } from './hooks/useYears';
import { usePeriod } from './hooks/usePeriod';
import { usePrograms } from './hooks/usePrograms';
import { useSections } from './hooks/useSections';
import SearchFilterCard from './components/SearchFilterCard';

const App = () => {
  const { years, yrErr } = useYears();
  const { period, prdErr } = usePeriod();
  const [selectedYearLevel, setSelectedYearLevel] = useState('')
  const [selectedPrd, setSelectedPrd] = useState('')
  const [selectedPrgm, setSelectedPrgm] = useState('')
  const [selectedSect, setSelectedSect] = useState('')
  const { programs, prgErr, fetchPrograms } = usePrograms()
  const { sections, sectionErr, fetchSections } = useSections();

  useEffect(() => {
    if(selectedYearLevel && selectedPrd){
      fetchPrograms({yearId: selectedYearLevel, periodId: selectedPrd})
    }},[selectedYearLevel, selectedPrd])

  useEffect(()=>{
    if(selectedYearLevel && selectedPrd && selectedPrgm){ 
      fetchSections(selectedYearLevel, selectedPrd, selectedPrgm)
    }
  },[selectedYearLevel, selectedPrd, selectedPrgm])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <SearchFilterCard 
          years={years}  
          period={period} 
          programList={programs}
          sectionList={sections}

          yrErr={yrErr}
          prdErr={prdErr}
          prgmErr={prgErr}
          sectionErr={sectionErr}

          slctYr={selectedYearLevel}
          slctPrd={selectedPrd}
          slctPrgm={selectedPrgm}
          slctSect={selectedSect}

          ocSlctYr={setSelectedYearLevel}
          ocSlctPrd={setSelectedPrd}
          ocSlctPrgm={setSelectedPrgm}
          ocSlctSect={setSelectedSect}
        />
      </div>
    </div>
  )
}

export default App;
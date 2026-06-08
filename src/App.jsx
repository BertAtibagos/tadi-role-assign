import { useState } from 'react';
import Button from './components/Button';
import Yrdropdown from './components/Yrdropdown';
import Prddropdown from './components/Prddropdown';
import InputField from './components/InputField';
import { useYears } from './hooks/useYears';
import { usePeriod} from './hooks/usePeriod';

const App = () => {
  const { years, yrErr } = useYears();
  const { period, prdErr } = usePeriod();

  const [selectedyear, setSelectedyear] = useState('')
  const [selectedprd, setSelectedprd] = useState('')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex flex-1 flex-col gap-3 md:flex-row">
                <Yrdropdown 
                  style="w-full md:w-56" 
                  years={years}
                  yrErr={yrErr}
                  value={selectedyear}
                  onChange={(e) => setSelectedyear(e.target.value)}
                />
                <Prddropdown 
                  style="w-full md:w-56" 
                  period={period}
                  prdErr={prdErr}
                  value={selectedprd}
                  onChange={(e) => setSelectedprd(e.target.value)}
                />
              </div>
              <Button
                style="w-full md:w-28 bg-blue-600/60"
                text="Search"
              />
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <InputField
                style="w-full md:flex-1"
                text="Search by name"
              />
              <Button
                style="w-full md:w-28 bg-green-600/60"
                text="Search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
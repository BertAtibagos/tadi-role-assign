import Button from './Button';
import Yrdropdown from './Yrdropdown';
import Prddropdown from './Prddropdown';
import InputField from './InputField';
import Prgmdropdown from './Prgrmdropdown';
import { useState } from 'react';

export default function SearchFilterCardComp(props) {
    const { years, yrErr, period, prdErr } = props;
    const [selectedYear, setSelectedYear] = useState('')
    const [selectedPrd, setSelectedPrd] = useState('')
    const [selectedPrgm, setSelectedPrgm] = useState('')
    
    return(
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex flex-1 flex-col gap-3 md:flex-row">
                <Yrdropdown 
                  style="w-full md:w-56" 
                  years={years}
                  yrErr={yrErr}
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                />
                <Prddropdown 
                  style="w-full md:w-56" 
                  period={period}
                  prdErr={prdErr}
                  value={selectedPrd}
                  onChange={(e) => setSelectedPrd(e.target.value)}
                />
                <Prgmdropdown
                  style="w-full md:w-56"
                  value={selectedPrgm}
                  onChange={(e) => setSelectedPrgm(e.target.value)}

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
    );
}
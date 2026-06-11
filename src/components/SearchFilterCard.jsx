import Button from './Button';
import Yrdropdown from './Yrdropdown';
import Prddropdown from './Prddropdown';
import InputField from './InputField';
import Prgmdropdown from './Prgrmdropdown';
// import { useState } from 'react';

export default function SearchFilterCardComp(props) {
    const { years, 
            yrErr, 
            period, 
            prdErr, 
            slctYr, 
            slctPrd, 
            ocSlctYr, 
            ocSlctPrd,
            slctPrgm,
            ocSlctPrgm,
            programList,
            prgmErr
          } = props;
    
    return(
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 w-fit">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex flex-1 flex-col gap-3 md:flex-row">
                <Yrdropdown 
                  style="w-full md:w-56" 
                  years={years}
                  yrErr={yrErr}
                  value={slctYr} 
                  onChange={(e) => ocSlctYr(e.target.value)}
                />
                <Prddropdown 
                  style="w-full md:w-56" 
                  period={period}
                  prdErr={prdErr}
                  value={slctPrd}
                  onChange={(e) => ocSlctPrd(e.target.value)}
                />
                <Prgmdropdown
                  style="w-full md:w-56"
                  program={programList}
                  value={slctPrgm}
                  onChange={(e) => ocSlctPrgm(e.target.value)}
                  prgErr={prgmErr}
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
export default function ClassListTableComp(props) {
    const { classListData } = props;
    return(
        <div>
            <table className="w-full table-auto border-collapse text-left">
                <thead>
                    <tr className="border-b border-white/10">  
                        {/* <th className="px-4 py-2 text-sm font-medium text-slate-400">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        </th> */}
                        <th className="px-4 py-2 text-sm font-medium text-slate-400">Student Name</th>
                        <th className="px-4 py-2 text-sm font-medium text-slate-400">Status</th>
                        <th className="px-4 py-2 text-sm font-medium text-slate-400">Action</th>   
                        <th></th>
                    </tr> 
                </thead>
                <tbody>
                    {classListData.map(item =>(
                        <tr className="border-b border-white/10" key={item.student_id}>
                            {/* <td className="px-4 py-2 text-sm text-slate-100">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </td> */}
                            <td className="px-4 py-2 text-sm text-slate-100">{item.student_name}</td>
                            <td className="px-4 py-2 text-sm text-slate-100">
                                <span className="rounded px-2 py-1 text-xs bg-green-600/20 text-green-400">
                                    Assigned
                                </span>
                            </td>
                            <td className="px-4 py-2 text-sm text-slate-100">
                                {/* <button className="rounded bg-green-600/60 px-3 py-1 text-sm text-white hover:bg-green-600/80">Assign</button> */}
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </td>
                        </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
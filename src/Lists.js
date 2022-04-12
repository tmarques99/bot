import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown'

function Lists(props) {
  let {createList, fetchTraits, traits} = props
  // let [traits, setTraits] = useState({})
  let [selectedTraits, setSelectedTraits] = useState([])
  let [collection, setCollection] = useState("superfarm")
  let [contract, setContract] = useState()

  let options = [], id = 1

  for(let group of Object.keys(traits)){
    let trait = traits[group]
    for(let name of trait){
      options.push({group, name, id})
      id += 1
    }
  }

  useEffect(() => {
    fetch(`https://api.opensea.io/api/v1/collection/${collection}`).then(r => r.json().then(data => {
      setContract(data.collection.primary_asset_contracts[0].address)
    }))
  }, [collection])
  // const fetchTraits = () => {
  //   // alert("zzz")
  //   fetch(`https://api.opensea.io/api/v1/collection/${collection}`).then(r => r.json().then(data => {
  //     setTraits(data.collection.traits)
  //   }))
  // }

  return <><div className="w-1/2 px-3 mb-6 md:mb-0">
    <label className="w-full block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Collection
    </label>
    <div className="w-full flex  mb-3">
      <input onChange={(e) => setCollection(e.target.value)} className="flex-grow bg-gray-200 text-gray-700 border rounded py-3 px-2 text-sm mr-2" type="text" value={collection} />
      <button onClick={(e) => fetchTraits(collection)} className="bg-blue-500 px-2 h-10 rounded-full text-white">Go</button>
    </div>
  </div>
    {traits && Object.keys(traits).length > 0 && <div className="w-1/2 px-3 mb-6 md:mb-0">
      <label className="w-full block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Traits
      </label>
      <div className="w-full flex  mb-3">
        <Multiselect
          options={options} // Options to display in the dropdown
          // selectedValues={dpw[curLayer.name][trait.name].map(i => options[i])}
          onSelect={(a, t) => setSelectedTraits([...selectedTraits, t])}
          onRemove={(a, t) => setSelectedTraits(selectedTraits.filter(t2 => t2.id !== t.id))}
          groupBy={"group"}
          displayValue="name"
          // className="inline "
          className="flex-grow bg-gray-200 text-gray-700 border rounded py-1 px-2 text-sm mr-2"
        />
        <button onClick={(e) => createList(contract, selectedTraits)} className="bg-blue-500 px-2 ml-2 rounded-full text-white h-10">Create</button>
      </div>

    </div>}



    {JSON.stringify({contract})}

  </>
}


export default Lists
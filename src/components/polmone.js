import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Polmone = () => {
  const [isTassoOpen, setTassoOpen] = useState(false);
  const [selectedTasso, setSelectedTasso] = useState("Tasso standard"); // Aggiunto stato per il tasso selezionato
  const [TassoName, setTassoName] = useState("Tasso standard");
  const [isAnnoVisible, setAnnoVisible] = useState(false);
  const [isSessoOpen, setSessoOpen] = useState(false);
  const [selectedSesso, setSelectedSesso] = useState("");
  const [isEtaVisible, setEtaVisible] = useState(false);

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "2020", checked: false },
    { id: 2, label: "2019", checked: false },
    { id: 3, label: "2018", checked: false },
    { id: 4, label: "2017", checked: false },
    { id: 5, label: "2016", checked: false },
    { id: 6, label: "2015", checked: false },
    { id: 7, label: "2014", checked: false },
    { id: 8, label: "2013", checked: false },
    { id: 9, label: "2012", checked: false },
    { id: 10, label: "2011", checked: false },
    { id: 11, label: "2010", checked: false },
    { id: 12, label: "2009", checked: false },
    { id: 13, label: "2008", checked: false },
    { id: 14, label: "2007", checked: false },
    { id: 15, label: "2006", checked: false },
  ]);

  const [etaOptions, setEtaOptions] = useState([
    { id: 1, label: "0-4", checked: false },
    { id: 2, label: "5-9", checked: false },
    { id: 3, label: "10-14", checked: false },
    { id: 4, label: "15-19", checked: false },
    { id: 5, label: "20-24", checked: false },
    { id: 6, label: "25-29", checked: false },
    { id: 7, label: "30-34", checked: false },
    { id: 8, label: "35-39", checked: false },
    { id: 9, label: "40-44", checked: false },
    { id: 10, label: "45-49", checked: false },
    { id: 11, label: "50-54", checked: false },
    { id: 12, label: "55-59", checked: false },
    { id: 13, label: "60-64", checked: false },
    { id: 14, label: "65-69", checked: false },
    { id: 15, label: "70-74", checked: false },
    { id: 16, label: "75-79", checked: false },
    { id: 17, label: "80-84", checked: false },
    { id: 18, label: "85-89", checked: false },
    { id: 19, label: ">=90", checked: false },
    // altre opzioni
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermEta, setSearchTermEta] = useState("");

  // GESTIONE FILTRI
  const toggleDropdownFiltri = (dropdown) => {
    switch (dropdown) {
      case "tasso":
        setTassoOpen(!isTassoOpen);
        setAnnoVisible(false);
        setSessoOpen(false);
        setEtaVisible(false);
        break;
      case "sesso":
        setTassoOpen(false);
        setAnnoVisible(false);
        setSessoOpen(!isSessoOpen);
        setEtaVisible(false);
        break;
      case "anno":
        setTassoOpen(false);
        setAnnoVisible(!isAnnoVisible);
        setSessoOpen(false);
        setEtaVisible(false);
        break;
      case "età":
        setEtaVisible(!isEtaVisible);
        setSessoOpen(false)
        setAnnoVisible(false)
        setTassoOpen(false)
        break;
      default:
        setEtaVisible(false);
        setAnnoVisible(false)
        setEtaVisible(false)
        setTassoOpen(false)
    }
  };

  const handleAnnoVisible = () => {
    setAnnoVisible(!isAnnoVisible);
  };

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearAll = () => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => ({ ...checkbox, checked: false }))
    );
  };

  const handleSelectAll = () => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: checkbox.label.toLowerCase().includes(searchTerm.toLowerCase()),
      }))
    );
  };

  const handleSelectAllEta = () => {
    setEtaOptions((prevEtaOptions) =>
      prevEtaOptions.map((option) => ({
        ...option,
        checked:
          option.label.toLowerCase().includes(searchTermEta.toLowerCase()) ||
          option.checked,
      }))
    );
  };

  const handleClearAllEta = () => {
    setEtaOptions((prevEtaOptions) =>
      prevEtaOptions.map((option) => ({ ...option, checked: false }))
    );
  };

  const handleEtaOptionChange = (id) => {
    setEtaOptions((prevEtaOptions) =>
      prevEtaOptions.map((option) =>
        option.id === id
          ? { ...option, checked: !option.checked }
          : option
      )
    );
  };

  const filteredCheckboxes = checkboxes.filter((checkbox) =>
    checkbox.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEtaOptions = etaOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTermEta.toLowerCase())
  );

  const handleTasso = (tassoName) => {
    if (selectedTasso !== tassoName) {
      setSelectedTasso(tassoName);
    }
    setTassoOpen(!isTassoOpen);
  };

  const handleSesso = () => {
    setSessoOpen(!isSessoOpen);
  };

  // IMPOSTAZIONI GRAFICO
  const options = {
    title: {
      text: "Il tuo grafico Highcharts",
    },
    xAxis: {
      categories: ["A", "B", "C", "D", "E", "F"],
    },
    yAxis: {
      title: {
        text: "Valori",
      },
    },
    series: [
      {
        name: "Dati",
        data: [1, 2, 3, 4, 5, 6],
      },
      {
        name: "Dati2",
        data: [5, 2, 6, 3, 5],
      },
    ],
  };

  return (
    <div className="">
      <div className="mt-5">
        {/* FILTRI */}
        <div className="flex flex-row items-center space-x-3 pl-16">
          {/* TASSO */}
          <div>
            <button
              className="h-5 w-32 bg-gray-200 border border-black flex items-center justify-center"
              onClick={() => {
                handleTasso(selectedTasso);
                toggleDropdownFiltri("tasso");
              }}
            >
              {TassoName}
            </button>
            {isTassoOpen && (
              <div className="pr-32">
                <div className=" flex flex-col h-20 w-40 bg-white border border-gray-400 absolute z-10 rounded-md">
                  <div class="flex mt-1">
                    <input
                      checked={TassoName === "Tasso standard"}
                      id="TassoStandard"
                      type="radio"
                      value="Tasso standard"
                      name="tassi"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                      onClick={() => { setTassoName("Tasso standard") }}
                    />
                    <label
                      for="TassoStandard"
                      className="m s-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Tasso standard
                    </label>
                  </div>
                  <div className="flex ">
                    <input
                      checked={TassoName === "Tasso grezzo"}
                      id="TassoGrezzo"
                      type="radio"
                      value="Tasso grezzo"
                      name="tassi"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      onClick={() => { setTassoName("Tasso grezzo") }}
                    />
                    <label
                      for="TassoGrezzo"
                      className=" ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Tasso grezzo
                    </label>
                  </div>
                  <div className="flex ">
                    <input
                      checked={TassoName === "SIR"}
                      id="SIR"
                      type="radio"
                      value="SIR"
                      name="tassi"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      onClick={() => { setTassoName("SIR") }}
                    />
                    <label
                      for="SIR"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      SIR
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* ANNO */}
          <div>
            <button
              className="h-5 w-32 bg-gray-200 border border-black flex items-center justify-center"
              onClick={() => {
                handleAnnoVisible();
                toggleDropdownFiltri("anno");
              }}
            >
              Anno
            </button>
            {isAnnoVisible && (
              <div className="w-36 h-40 overflow-auto flex flex-col items-center bg-white border border-black absolute z-10 rounded-md">
                <input
                  type="text"
                  placeholder="Ricerca..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-28"
                ></input>
                <button onClick={handleSelectAll}>Seleziona tutti</button>
                <button onClick={handleClearAll}>Pulisci</button>
                {filteredCheckboxes.map((checkbox) => (
                  <div key={checkbox.id}>
                    <input
                      type="checkbox"
                      id={`checkbox-${checkbox.id}`}
                      checked={checkbox.checked}
                      onChange={() => handleCheckboxChange(checkbox.id)}
                    />
                    <label htmlFor={`checkbox-${checkbox.id}`}>
                      {checkbox.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* SESSO */}
          <div>
            <button
              className="h-5 w-32 bg-gray-200 border border-black flex items-center justify-center"
              onClick={() => {
                handleSesso(selectedSesso);
                toggleDropdownFiltri("sesso");
              }}
            >
              <p className={selectedSesso === "Maschi e Femmine" && "text-xs"}>{selectedSesso}</p>
            </button>
            {isSessoOpen && (
              <div className="pr-32">
                <div className=" flex flex-col h-20 w-44 bg-white border border-gray-400 rounded-md absolute z-10">
                  <div class="flex mt-1">
                    <input
                      checked={selectedSesso === "Maschi e Femmine"}
                      id="Maschi e Femmine"
                      type="radio"
                      value="Maschi e Femmine"
                      name="sesso"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                      onClick={() => { setSelectedSesso("Maschi e Femmine") }}
                    />
                    <label
                      for="Maschi e Femmine"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Maschi e Femmine
                    </label>
                  </div>
                  <div class="flex mt-1">
                    <input
                      checked={selectedSesso === "Maschi"}
                      id="Maschi"
                      type="radio"
                      value="Maschi"
                      name="sesso"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                      onClick={() => { setSelectedSesso("Maschi") }}

                    />
                    <label
                      for="Maschi"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Maschi
                    </label>
                  </div>
                  <div class="flex mt-1">
                    <input
                      checked={selectedSesso === "Femmine"}
                      id="Femmine"
                      type="radio"
                      value="Femmine"
                      name="sesso"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                      onClick={() => { setSelectedSesso("Femmine") }}
                    />
                    <label
                      for="Femmine"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Femmine
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* ETA' */}
          <div>
            <button
              className="h-5 w-32 bg-gray-200 border border-black flex items-center justify-center"
              onClick={() => {
                handleEtaOptionChange();
                toggleDropdownFiltri("età");
              }}
            >
              Età
            </button>
            {isEtaVisible && (
              <div className="w-36 h-40 overflow-auto flex flex-col items-center bg-white border border-black absolute z-10 rounded-md">
                <input
                  type="text"
                  placeholder="Ricerca..."
                  value={searchTermEta}
                  onChange={(e) => setSearchTermEta(e.target.value)}
                  className="w-28"
                />
                <button onClick={handleSelectAllEta}>Seleziona tutti</button>
                <button onClick={handleClearAllEta}>Pulisci</button>
                {/* Mappa e visualizza opzioni "Eta'" */}
                {filteredEtaOptions.map((option) => (
                  <div key={option.id}>
                    <input
                      type="checkbox"
                      id={`checkbox-eta-${option.id}`}
                      checked={option.checked}
                      onChange={() => handleEtaOptionChange(option.id)}
                    />
                    <label htmlFor={`checkbox-eta-${option.id}`}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* CHART */}
        <div>
          <p>Hai selezionato i seguenti campi: {selectedSesso} , {selectedTasso}</p>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Polmone;

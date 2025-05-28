import React, { useState, useEffect } from "react";
import "./DiseaseInfo.style.css";
import axios from "axios";

const symptomMedicineMap = {
  fever: ["Paracetamol", "Ibuprofen"],
  cough: ["Dextromethorphan", "Guaifenesin"],
  headache: ["Aspirin", "Ibuprofen"],
  soreThroat: ["Lozenge", "Chloraseptic Spray"],
  fatigue: ["Vitamin B Complex", "Ginseng Extract"],
  nausea: ["Dimenhydrinate", "Ondansetron"],
};

const symptomLabelMap = {
  fever: ["발열", "열감"],
  cough: ["기침", "가래"],
  headache: ["두통", "머리통증"],
  soreThroat: ["인후통", "목아픔"],
  fatigue: ["피로감", "권태감"],
  nausea: ["메스꺼움", "구역질"],
};

const DiseaseInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    axios
      .get("http://apis.data.go.kr/B551182/msupCmpnMeftInfoService")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const symptomHandle = (e) => {
    const { value, checked } = e.target;
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((sym) => sym !== value)
    );
  };

  const recommended = Array.from(
    new Set(selected.flatMap((sym) => symptomMedicineMap[sym] || []))
  );
  if (loading) return <p>로딩 중…</p>;
  // if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="container">
      <h1>병 목록</h1>
      <ul className="diseaseList">
        {data.map((item) => (
          <li key={item.id} className="diseaseItem">
            <h3>{item.name}</h3>
            <p>증상: {item.symptoms.join(", ")}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
      <h2>증상을 선택하세요</h2>
      <div className="symptomList">
        {Object.keys(symptomMedicineMap).map((sym) => {
          const labels = symptomLabelMap[sym] || []; // 레이블 배열
          return (
            <label key={sym} className="symptomItem">
              <input
                type="checkbox"
                value={sym}
                checked={selected.includes(sym)}
                onChange={symptomHandle}
              />
              <div className="symptomLabels">
                {labels.map((text, i) => (
                  <span key={i} className="symptomLabel">
                    {text}
                  </span>
                ))}
              </div>
            </label>
          );
        })}
      </div>
      <h2>추천 약품</h2>
      {recommended.length > 0 ? (
        <ul className="medicineList">
          {recommended.map((med, i) => (
            <li key={i}>{med}</li>
          ))}
        </ul>
      ) : (
        <p>증상을 선택해주세요</p>
      )}
    </div>
  );
};

export default DiseaseInfo;

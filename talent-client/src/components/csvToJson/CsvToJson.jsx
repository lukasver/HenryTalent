import React, { useState } from 'react';
import axios from 'axios';
import { bulkCandidates } from '../../redux/candidatesReducer/Action';
import { useDispatch } from 'react-redux';

function CsvToJson() {
  const [csvTransformedToJson, setCsvTransformedToJson] = useState();

  const dispatch = useDispatch();

  const handleCsvToJson = (e) => {
    e.preventDefault();
    let csvFile = e.target.files[0];
    let formData = new FormData();
    formData.append('file', csvFile);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND_URL}/candidates/csv`,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    }).then((res) => {
      setCsvTransformedToJson(res.data);
    });
  };

  const handleBulkCandidates = () => {
    dispatch(bulkCandidates(csvTransformedToJson));
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <input
              className="form-control"
              name="file"
              type="file"
              id="input"
              accept=".csv"
              onChange={handleCsvToJson}
            ></input>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              id="button"
              onClick={handleBulkCandidates}
            >
              Convert
            </button>
          </div>
          <div className="col-md-12">
            <pre id="jsondata"></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CsvToJson;

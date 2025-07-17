import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/Nikitaimage.jpg"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Nikita Kumari</h4>
          <h6>Founder</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Nikita bootstrapped and founded Niveshpro in 2025 to overcome the
            hurdles she faced during her decade long stint as a trader. Today,
            Niveshpro has changed the landscape of the Indian broking industry.
          </p>
          <p>
            She is a student of the Cimage Professional College 
            (CIMAGE) and the batch is Bachelor's In Computer Application (BCA).
          </p>
          <p>Making websites is her zen.</p>
          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
            <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;

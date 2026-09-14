import React from "react";

export default function About() {
  return (
    <div>
      <h1>About this project</h1>
      <div className="card" style={{ lineHeight: 1.7, fontSize: 14.5 }}>
        <p>
          This application predicts lung cancer risk from lifestyle and symptom survey data using a
          <strong> Bagging Classifier</strong> (bootstrap-aggregated decision trees). Before training, the
          pipeline runs <strong>sequential forward feature elimination</strong>: starting from zero
          features, it repeatedly adds whichever remaining feature improves cross-validated accuracy the
          most, stopping once further additions stop helping.
        </p>
        <p>
          The model is compared against Logistic Regression, a single Decision Tree, Random Forest, and
          SVM, both with and without forward elimination, using accuracy, precision, recall, F1-score,
          and ROC-AUC.
        </p>
        <div className="disclaimer" style={{ marginTop: 18 }}>
          This system is for educational and research purposes only and is not a medical diagnosis. If
          you have health concerns, please consult a qualified healthcare professional.
        </div>
      </div>
    </div>
  );
}

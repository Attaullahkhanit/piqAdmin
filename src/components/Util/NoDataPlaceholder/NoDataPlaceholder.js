import React from "react";
import { ReactComponent as NoData } from "../../../assets/business/home/noData.svg";
import './styles.scss'
export default function NoDataPlaceholder() {
  return (
    <div className="no-data-placeholder">
      <NoData />
      <p>No Data Found For Selected Parameters</p>
    </div>
  );
}

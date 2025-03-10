import { useParams } from "react-router-dom";

function KindergartenDetail() {
  let { id } = useParams<"id">();
  return <div>{id}유치원 상세</div>;
}

export default KindergartenDetail;

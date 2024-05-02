import { useParams } from "next/navigation";

export default function userDetails({ params: any }) {
  const params = useParams();
  return;
  <>
    <h1>USER DETAILS</h1>
    <p>Profile Page</p>
    <span>{params.id}</span>
  </>;
}

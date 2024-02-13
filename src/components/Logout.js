import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = () => {

  const navigate=useNavigate();

  const handleClick = async ()=>{
    localStorage.clear();
    navigate('/login')
  }

  return ( 
    <Button onClick={handleClick}>
      LOGOUT
    </Button>
  );
}

const Button = styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  boder:none;
  cursor:pointer;
  color:darkred;
`;

export default Logout;
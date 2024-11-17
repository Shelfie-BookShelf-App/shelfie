const Login = (props) => {
    
  const AUTH_URL = `${props.api_url}/auth/github`
   
  return (
      <div className="w-screen h-screen flex justify-center items-center">
          <center>
            <a href={AUTH_URL} className="">
              🔒 Login via Github
            </a>
          </center>
      </div>  
  )
}

export default Login
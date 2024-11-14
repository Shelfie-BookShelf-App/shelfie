import styles from './Login.module.css'

const Login = (props) => {
    
  const AUTH_URL = `${props.api_url}/auth/github`
   
  return (
      <div className={styles.login}>
          <center><a href={AUTH_URL}>
              <button className={styles.login_button}> 🔒 Login via Github </button>
          </a></center>
      </div>  
  )
}

export default Login
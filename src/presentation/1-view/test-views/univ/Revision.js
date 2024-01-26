/*
1-la importacion de SignIn esta repetida 
2-si el localStorage está vacio las otras dos condiciones siempre van 
a ser null de modo q lo mas practico y efectivo es evaluar la condicion para el username y el accessToken
asi(linea 12) :
*/
function RequireAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    //if (localStorage.length === 0 && localStorage.getItem("username") === null && localStorage.getItem("accessToken") === null) {
    if (localStorage.getItem("username") === null && localStorage.getItem("accessToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  return children;
}
/*
3- Hay una inconrguencia en las importanciones no se esta importando ningun AdminProfile.js. desde AdminProfile
Me imganino q sea el mismo componente Profile en AdminProfile.js fue lo q quisiste usar como el componente AdminProfile.

*/


//QuotaManagement.js
/*
Los datos al actualizar el estado  de las cuentas no se esta actualizando visualmente en la interface si no se recarga la pagina 
la solucion cavernicola es volver a llamar a fetchData luego de actualizar algun dato del estado en sendData 
Solucion :  
-sacar el fetch del useEffect y llamarlo dentro(linea 46)
-llamar a la funcion fecthData luego de enviar los datos con sendData (linea 71)
*/
// Definir fetchData fuera del useEffect
const fetchData = async () => {
    const response = await fetch(config.ServerApi+"/QuotaTotal");
    const data = await response.json();
    data.forEach(element => {
      if (element.name === localStorage.getItem('user').split('@')[0]) {
        setUserData(element.totalQuota);
      }
    });
  };
  
  useEffect(() => {
    // Llamar a fetchData dentro del useEffect
    fetchData();
  }, []);
  
  const sendData = (url, username, gigabytes) => {
    const data = {
      username: String(username),
      gigabytes: Number(gigabytes)
    };
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          console.log(`Status: ${response.status}`);
          setAlertStatus('error');
        } else {
          setAlertStatus('success');
          setNewQuota(gigabytes);
          // Llamar a fetchData dentro de sendData
          fetchData();
        }
        return response.status;
      })
      .catch(error => {
        console.error('Error:', error);
        setAlertStatus('error');
      });
  };
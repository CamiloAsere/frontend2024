classDiagram
    class Usuario {
        -Id : int
        -Nombre : string
        -Rol : string
        -Cuota : int
        +Usuario()
        +Usuario(id, nombre, rol, cuota)
        +GetId() : int
        +SetId(id : int) : void
        +GetNombre() : string
        +SetNombre(nombre : string) : void
        +GetRol() : string
        +SetRol(rol : string) : void
        +GetCuota() : int
        +SetCuota(cuota : int) : void
    }
    class Autenticacion {
        -Token : string
        +Autenticacion()
        +Autenticacion(token : string)
        +GetToken() : string
        +SetToken(token : string) : void
        +GenerarToken(usuario : Usuario) : string
        +VerificarToken(token : string) : bool
    }
    class ServicioUsuario {
        -RepositorioUsuario : IRepositorioUsuario
        +ServicioUsuario(repositorioUsuario : IRepositorioUsuario)
        +ObtenerTodosLosUsuarios() : List<Usuario>
        +ObtenerUsuarioPorId(id : int) : Usuario
        +ObtenerUsuarioPorNombre(nombre : string) : Usuario
        +CrearUsuario(usuario : Usuario) : Usuario
        +ActualizarUsuario(usuario : Usuario) : Usuario
        +EliminarUsuario(id : int) : void
    }
    class ServicioCuota {
        -RepositorioCuota : IRepositorioCuota
        +ServicioCuota(repositorioCuota : IRepositorioCuota)
        +AsignarCuota(usuario : Usuario, cuota : int) : Usuario
        +ConsultarCuota(usuario : Usuario) : int
    }
    class IRepositorioUsuario {
        +ObtenerTodosLosUsuarios() : List<Usuario>
        +ObtenerUsuarioPorId(id : int) : Usuario
        +ObtenerUsuarioPorNombre(nombre : string) : Usuario
        +CrearUsuario(usuario : Usuario) : Usuario
        +ActualizarUsuario(usuario : Usuario) : Usuario
        +EliminarUsuario(id : int) : void
    }
    class IRepositorioCuota {
        +AsignarCuota(usuario : Usuario, cuota : int) : Usuario
        +ConsultarCuota(usuario : Usuario) : int
    }
    class RepositorioUsuarioSQLite {
        -ContextoDatos : ContextoDatos
        +RepositorioUsuarioSQLite(contextoDatos : ContextoDatos)
        +ObtenerTodosLosUsuarios() : List<Usuario>
        +ObtenerUsuarioPorId(id : int) : Usuario
        +ObtenerUsuarioPorNombre(nombre : string) : Usuario
        +CrearUsuario(usuario : Usuario) : Usuario
        +ActualizarUsuario(usuario : Usuario) : Usuario
        +EliminarUsuario(id : int) : void
    }
    class RepositorioCuotaSQLite {
        -ContextoDatos : ContextoDatos
        +RepositorioCuotaSQLite(contextoDatos : ContextoDatos)
        +AsignarCuota(usuario : Usuario, cuota : int) : Usuario
        +ConsultarCuota(usuario : Usuario) : int
    }
    class ContextoDatos {
        -Conexion : string
        +ContextoDatos(conexion : string)
        +Usuarios : DbSet<Usuario>
        +OnConfiguring(optionsBuilder : DbContextOptionsBuilder) : void
        +OnModelCreating(modelBuilder : ModelBuilder) : void
    }
    class ComponenteLogin {
        -ServicioAutenticacion : Autenticacion
        +ComponenteLogin(servicioAutenticacion : Autenticacion)
        +Renderizar() : void
        +ManejarCambioNombreUsuario(evento : Evento) : void
        +ManejarCambioContraseña(evento : Evento) : void
        +ManejarEnvioFormulario(evento : Evento) : void
    }
    class ComponentePerfil {
        -ServicioAutenticacion : Autenticacion
        -ServicioCuota : ServicioCuota
        +ComponentePerfil(servicioAutenticacion : Autenticacion, servicioCuota : ServicioCuota)
        +Renderizar() : void
        +ManejarCierreSesion(evento : Evento) : void
    }
    class ComponenteAdministracion {
        -ServicioAutenticacion : Autenticacion
        -ServicioUsuario : ServicioUsuario
        -ServicioCuota : ServicioCuota
        +ComponenteAdministracion(servicioAutenticacion : Autenticacion, servicioUsuario : ServicioUsuario, servicioCuota : ServicioCuota)
        +Renderizar() : void
        +ManejarCierreSesion(evento : Evento) : void
        +ManejarClicAgregarAdmin(evento : Evento) : void
        +ManejarClicCambiarCuota(evento : Evento) : void
        +ManejarCambioNombreUsuario(evento : Evento) : void
        +ManejarCambioCantidadCuota(evento : Evento) : void
        +ManejarEnvioFormulario(evento : Evento) : void
    }
  RepositorioUsuarioSQLite <|.. IRepositorioUsuario
RepositorioCuotaSQLite <|.. IRepositorioCuota
ServicioUsuario -- IRepositorioUsuario
ServicioCuota -- IRepositorioCuota
RepositorioUsuarioSQLite --> ContextoDatos
RepositorioCuotaSQLite --> ContextoDatos
ComponenteLogin -- Autenticacion
ComponentePerfil -- Autenticacion
ComponentePerfil -- ServicioCuota
Usuario -- Autenticacion
Usuario -- ServicioUsuario
ComponenteAdministracion -- Autenticacion
ComponenteAdministracion -- ServicioUsuario
ComponenteAdministracion -- ServicioCuota
 </script>
<script src="/ruta/main.4f8630a0c9f03caead49.js">
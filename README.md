# Desafio Genomawork

### Tecnologias usada en el desarrollo

- Python 3.7
- Django 3.2
- Postgresql 12.3
- Visual studio code

## Back-end

- Modificar el archivo backend/backend/settings.py y modificar USER y PASSWORD con los valores de su usuario y contraseña de su gestor de base de datos

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'genomaworkDB',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432',
        'ATOMIC_REQUESTS': True,
    }
}
```

- Crear base de datos 'genomaworkDB' en postgresql

```bash
createdb -U postgres genomaworkDB
```

- Abrir un terminal en la carpeta del proyecto y ejecutar los siguientes comandos

```bash
# Preparar entorno con virtualenv
virtualenv env
env\Scripts\activate
```

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
```

- Una vez configurado, inicie el servidor backend

```bash
python manage.py runserver
```
## Front-end

- Abrir un terminal en la carpeta del proyecto y ejecutar los siguientes comandos

```bash
cd frontend
npm install
npm start
```

- Se abrirá una página web en http://localhost:3000
- Desde esta página podrá registrar, actualizar, listar y eliminar restaurantes de entre otras cosas...
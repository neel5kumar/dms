This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



mkdir <project_name>
cd <project_name>
mkdir frontend
mkdir backend

#Git steps
-


cd backend
pip3 install pipenv
pipenv install --three


pipenv install django 
pipenv install  djangorestframework 
pipenv install  django-rest-knox
pipenv install django-rest-framework-multi-slug-field

pipenv shell 
#or / pipenv run(inside)

django-admin startproject <project_name>
cd <project_name>
python manage.py startapp <service> e.g. employee

open <project-name>/settings
add following in INSTALLED_APPS
    'rest_framework',
    'rest_framework.authtoken',
    '<service>', e.g. employees

python manage.py makemigrations <service>
>>>> No changes detected in app 'employee'
python manage.py migrate 

Dev Steps:

1. under employee add models/models.py
2. Try shell :  python manage.py shell 
```
 from employees.models  import Employees
 ```

 3. Add following to settings.py
 --------------
 MEDIA_ROOT = '/Volumes/software/wisgo/mobile/elogitica/py_web/fin_help2'
MEDIA_URL = '/media/'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 5000,
     'DEFAULT_AUTHENTICATION_CLASSES': (
       'rest_framework.authentication.TokenAuthentication',
   ),
   'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAdminUser'
   ),
   
    # 'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
    # ]
}
---------------
4. models: Edit your module <service>/model.py. This contains permissions
5. serializers: add <service>/serializers.py 
6. Views/Pagination: add pagination based viewset in <service>/app.py. This class also contains PAGE_SIZE
7. Urls
    (a) add <service>/urls.py
    (b)  Edit <project>/urls.py
8. More points
    (a) change postgre database
    (b) Enable Auth
    (c) check proper website



frontend
1. npx create-react-app <project_name>
e.g. npx create-react-app dmsui
2. in package.json add  "proxy": "http://localhost:8000" 




Start process
/Volumes/software/wisgo/mobile/elogitica/passion/dms/backend
pipenv shell 
/Volumes/software/wisgo/mobile/elogitica/passion/dms/backend/dms

python manage.py runserver

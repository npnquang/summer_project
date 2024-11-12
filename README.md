# 1. Routing table

| Name                 | Endpoint                                | HTTP Method | Purpose                                             |  Component                | Example URL                                          |
| -------------------- | --------------------------------------- | ----------- | --------------------------------------------------- | ------------------------- | ---------------------------------------------------- |
| Home                 | `/`                                     | GET         | Return the main page                                | `MainPageComponent`        | `localhost:8080/#/`                                  |
| List Drivers         | `/driver/list`                          | GET         | Display a list of all drivers                       | `ListDriverComponent`      | `localhost:8080/#/driver/list`                       |
| Add Driver           | `/driver/add`                           | GET         | Render the form to add a new driver                 | `AddDriverComponent`       | `localhost:8080/#/driver/add`                        |
| Delete Driver        | `/driver/delete`                        | GET         | Render the form to delete an existing driver        | `DeleteDriverComponent`    | `localhost:8080/#/driver/delete`                     |
| Update Driver        | `/driver/update`                        | GET         | Render the form to update driver details            | `UpdateDriverComponent`    | `localhost:8080/#/driver/update`                     |
| List Packages        | `/package/list`                         | GET         | Display a list of all packages                      | `ListPackageComponent`     | `localhost:8080/#/package/list`                      |
| Add Package          | `/package/add`                          | GET         | Render the form to add a new package                | `AddPackageComponent`      | `localhost:8080/#/package/add`                       |
| Delete Package       | `/package/delete`                       | GET         | Render the form to delete an existing package       | `DeletePackageComponent`   | `localhost:8080/#/package/delete`                    |
| Update Package       | `/package/update`                       | GET         | Render the form to update package details           | `UpdatePackageComponent`   | `localhost:8080/#/package/update`                    |
| View Stats           | `/stats`                                | GET         | Display statistical data related to the system      | `StatsComponent`           | `localhost:8080/#/stats`                             |
| Login                | `/login`                                | GET         | Return the login form                               | `LoginComponent`           | `localhost:8080/#/login`                             |
| Register             | `/register`                             | GET         | Return the registration form                        | `RegisterComponent`        | `localhost:8080/#/register`                          |
| Invalid Data         | `/invalid`                              | GET         | Display an error page for invalid data              | `InvalidDataComponent`     | `localhost:8080/#/invalid`                           |
| Text to Speech       | `/text-to-speech`                       | GET         | Render the text-to-speech conversion feature        | `LicenceToSpeechComponent` | `localhost:8080/#/text-to-speech`                    |
| Translate            | `/translate`                            | GET         | Render the translation feature                      | `TranslateComponent`       | `localhost:8080/#/translate`                         |
| Generative AI        | `/distance`                             | GET         | Display generative AI distance calculations         | `GenerativeAiComponent`    | `localhost:8080/#/distance`                          |
| Page Not Found       | `**`                                    | GET         | Display a 404 page for unknown paths                | `PageNotFoundComponent`    | N/A                                                   |


# 2. Steps to run the code

After downloading the `.zip` file and unzip it, please run the following commands:

## 2.1. To install the dependencies:
### 2.1.1 Backend:
Run this command in the root directory of the project
```
npm install
```
### 2.1.2 Frontend:
Change directory to the `frontend` folder using (from the root directory):
```
cd ./frontend
```

Run the following command to install the dependencies of the frontend:
```
npm install
```

## 2.2 To compile the frontend
Compile the frontend using the below command (in the `frontend` folder):
```
ng build
```

## 2.3 To launch the server
Go back to the root directory using the command:
```
cd ..
```

Start the server using the command:
```
nodemon server.js
```

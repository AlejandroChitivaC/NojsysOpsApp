![BBIC Colombia](/assets/images/logo_bbic-removebg-preview.png)
# NojsysApp Documentation

This is an React Native [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies, before install ensure that you have Node.js installed in the develop target machine. If it's not installed you can install it following this link. 
- [NodeJS official website](https://nodejs.org/en)

   ```bash
   npm install 
   ```

2. Start the app

   ```bash
    npx expo start
   ```

When running the last command, in the process of building the application you can see a QR code that can be scanned on an IOS/Android mobile device, in order for this QR code to be read correctly it's necessary to have Expo Go installed on the mobile, you can get it in the app store of your OS. This app allows you to preview the changes in the code in real time, but keep in mind that both the machine on which it's developed and the mobile device have to be on the same network.

**PLEASE NOTE THAT THIS APP WAS TESTED ONLY ON ANDROID OS.**
*For IOS you need to run the project on  MacOs machine and then install teh pods with the following command*

**This project was developed based on the official documentation of the Expo**

- [Expo documentation](https://docs.expo.dev/)


# API Reference
## Preinspection:

#### Get the master data based on master number.

```http
GET /api/Preinspection/{masterNumber}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `masterNumber` | `string` | **Required**. The master number |


- **Responses**:

| Code | Description | Response                |
| :--- | :------------- | :---------------------- |
| **200** | **`success`** |`{"isValid": true, "message": "Transacción exitosa", "dataSingle": { "item1": [...], "item2": [...] }}` |
| **404** | **`error`** |`{"isValid": false, "message": "Error con el proveedor del servicio. Comuniquese con sistemas.", "dataSingle": null` |



#### Update Houses

```http
POST /api/Preinspection/update/${houseNo}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `houseNo`| `string` | **Required**. The number of the house that will be update |
| `house`| `object` | **Required**. House object to update |

**NOTE:** In the body of axios request you need to send a house type object, see [House](/app/entities/House.ts) for a guide of the object that the server waits

# Tech Stack

## 1. Frontend

- **React Native**: The primary framework for building mobile applications using React. It allows the development of native apps for iOS and Android using JavaScript and React.

- **Expo**: A platform and set of tools for React Native that simplifies the development and deployment of mobile apps. Expo provides a range of pre-configured APIs and tools, such as asset management, cameras, notifications, and more.

- **TypeScript**: The programming language used to write the application code. TypeScript is a popular choice for its static typing features and other benefits.

- **UI Components and Libraries**:
  - **react-native-async-storage**: For persistent data storage.
  - **react-native-vector-icons**: For using vector icons in the app.
  - **@react-navigation/stack**: For navigating between screens in the app.
  - **@rneui/base**: Part of React Native Elements, a UI toolkit.
  - **react-native-animated-spinkit**: For loading animations.
  - **expo-camera**: For accessing the device's camera.
  - **expo-av**: For handling audio and video.

## 2. Backend (Optional, depends on the project)

- **REST/GraphQL APIs**: For communication with backend servers. This can be built with Node.js, Django, Ruby on Rails, etc.

- **Databases**: The app can interact with databases through the backend, such as PostgreSQL, MongoDB, Firebase, etc.

- **Authentication and Authorization**: Services like Firebase Authentication, Auth0, or custom implementations.

## 3. Third-Party Services

- **Analytics**: Google Analytics, Firebase Analytics, etc., for tracking users and events.
- **Push Notifications**: Firebase Cloud Messaging, Expo Push Notifications, etc.
- **Maps and Geolocation**: Google Maps, Mapbox, and native geolocation APIs.

## 4. Development Tools

- **Expo CLI**: Command-line tool for starting, developing, and building Expo apps.
- **Visual Studio Code**: A popular code editor with support for extensions and debugging.
- **Git**: Version control for managing the project's source code.
- **Jest**: For unit testing.
- **EAS (Expo Application Services)**: For automated builds and deployments.

## 5. CI/CD

- **GitHub Actions, GitLab CI/CD, CircleCI, etc.**: For continuous integration and deployment.

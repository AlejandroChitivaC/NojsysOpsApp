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

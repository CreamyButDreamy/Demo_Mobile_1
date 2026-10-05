# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

CODELAB 2
import {
View,
Text,
TextInput,
Button,
} from "react-native";

export default function Index() {
return (
<View>
<Text>Hello World</Text>
<TextInput placeholder="Type here..." />
<Button title="Click Me" />
</View>
);
}

CODELAB 3
import {
View,
Text,
TextInput,
Button,
StyleSheet,
} from "react-native";

export default function Index() {
return (
<View style={styles.container}>
<Text style={styles.title}>Hello World</Text>
<TextInput placeholder="Type here..." style={styles.input} />
<Button title="Click Me" />
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#e0f2fe",
justifyContent: "center",
padding: 20,
},
title: {
fontSize: 24, // Memperbaiki kesalahan 'size: big'
fontWeight: "bold",
color: "red",
marginBottom: 20,
textAlign: "center",
},
input: {
borderWidth: 2,
borderColor: "blue",
backgroundColor: "white",
padding: 10,
borderRadius: 10,
marginBottom: 20,
},
});

CODELAB 4
import {
View,
Text,
TextInput,
Pressable,
StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
return (
<View style={styles.container}>
{/_ Ikon information-circle di atas judul _/}
<Ionicons
        name="information-circle"
        size={40}
        color="#2563eb"
        style={styles.iconTop}
      />

      <Text style={styles.title}>Hello World</Text>
      <TextInput placeholder="Type here..." style={styles.input} />

      {/* Tombol kustom berisi ikon hand-left */}
      <Pressable style={styles.button}>
        <Ionicons name="hand-left" size={18} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Click Me</Text>
      </Pressable>
    </View>

);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#e0f2fe",
justifyContent: "center",
alignItems: "center",
padding: 20,
},
iconTop: {
marginBottom: 10,
},
title: {
fontSize: 26,
fontWeight: "bold",
color: "red",
marginBottom: 20,
textAlign: "center",
},
input: {
width: "100%",
borderWidth: 2,
borderColor: "blue",
backgroundColor: "white",
padding: 10,
borderRadius: 10,
marginBottom: 20,
},
button: {
width: "100%",
backgroundColor: "#2563eb",
flexDirection: "row",
alignItems: "center",
justifyContent: "center",
paddingVertical: 12,
borderRadius: 8,
},
buttonIcon: {
marginRight: 8,
},
buttonText: {
color: "white",
fontWeight: "bold",
fontSize: 16,
},
});

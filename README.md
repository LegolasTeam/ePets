## ePets - a Hackathon project
## Walkthrough
Here's a walkthrough of implemented user stories:

<img src='walkthrough.gif' title='Video Walkthrough' width='350px' height='600px' alt='Video Walkthrough' />

GIF created with [LiceCap](http://www.cockos.com/licecap/).

## Error fix on run & build with react-native-photo-view & react-native-vector-icons

Go to: ../node_modules/react-native-photo-view/android/src/main/java/com/reactnative/photoview

       ../node_modules/react-native-vector-icons/android/src/main/java/com/oblador/vectoricons

Open **PhotoViewPackage.java** && **VectorIconsPackage.java**

```javascript
...
@Override //<-- Remove this
public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
...
```



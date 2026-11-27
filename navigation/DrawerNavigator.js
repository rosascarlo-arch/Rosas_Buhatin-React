import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Test from '../screens/Test';
import SalaryCalculatorScreen from '../screens/SalaryCalculatorScreen';
import TodoListScreen from '../screens/TodoListScreen';
import TravelTodoScreen from '../screens/TravelTodoScreen';



const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name = "Test" component={Test}/>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name = "Salary Calculator" component={SalaryCalculatorScreen}/>
      <Drawer.Screen name="Study Planner" component={TodoListScreen}/>
      <Drawer.Screen name="Travel Planner" component={TravelTodoScreen}/>
    </Drawer.Navigator>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

interface TodoListProps {
  onBack: () => void;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

const TodoList = ({ onBack }: TodoListProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete Math Assignment", completed: false, priority: "high" },
    { id: "2", title: "Read Chapter 5 - History", completed: true, priority: "medium" },
    { id: "3", title: "Prepare for Science Quiz", completed: false, priority: "high" },
    { id: "4", title: "Write English Essay", completed: false, priority: "medium" }
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: "medium"
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-emerald-600 p-6">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-8">
          <Button 
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10 p-2 mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">To-Do List</h1>
        </div>

        {/* Add Task */}
        <Card className="bg-white rounded-2xl shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                className="bg-gray-50 border-gray-200 rounded-xl flex-1"
              />
              <Button onClick={addTask} className="bg-primary text-white hover:bg-primary/90 rounded-xl px-4">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card 
              key={task.id} 
              className="bg-white rounded-2xl shadow-sm"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="border-gray-300"
                    />
                    <div className="flex-1">
                      <span 
                        className={`text-gray-900 font-medium ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === "high" ? "bg-red-100 text-red-700" :
                          task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <Card className="bg-white rounded-2xl shadow-sm mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Progress</span>
              <span className="text-gray-600 text-sm">
                {tasks.filter(t => t.completed).length} of {tasks.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ 
                  width: `${tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoList;

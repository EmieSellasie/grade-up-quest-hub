
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
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-4xl font-bold text-white">To-Do List</h1>
          </div>
        </div>

        {/* Add Task */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white">Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              <Button onClick={addTask} className="bg-white text-black hover:bg-gray-200">
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
              className={`bg-white/5 border-white/10 backdrop-blur-sm border-l-4 ${getPriorityColor(task.priority)} ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="border-white/30"
                    />
                    <span 
                      className={`text-white ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === "high" ? "bg-red-500/20 text-red-300" :
                      task.priority === "medium" ? "bg-yellow-500/20 text-yellow-300" :
                      "bg-green-500/20 text-green-300"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
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
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-white">Progress</span>
              <span className="text-gray-300">
                {tasks.filter(t => t.completed).length} of {tasks.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
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

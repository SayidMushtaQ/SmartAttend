import { useState, useEffect } from "react";
import { Clock, Calendar, UserCheck, UserX } from "lucide-react";

export default function TeacherView() {
  // State for attendance session
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sessionActive, setSessionActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Mock student data - in a real app this would come from an API
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emma Johnson",
      status: "Absent",
      image: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "James Smith",
      status: "Present",
      image: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Olivia Williams",
      status: "Absent",
      image: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "Noah Brown",
      status: "Present",
      image: "/api/placeholder/40/40",
    },
    {
      id: 5,
      name: "Sophia Jones",
      status: "Present",
      image: "/api/placeholder/40/40",
    },
    {
      id: 6,
      name: "Liam Garcia",
      status: "Absent",
      image: "/api/placeholder/40/40",
    },
    {
      id: 7,
      name: "Charlotte Miller",
      status: "Absent",
      image: "/api/placeholder/40/40",
    },
    {
      id: 8,
      name: "Mason Davis",
      status: "Present",
      image: "/api/placeholder/40/40",
    },
  ]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Start attendance session
  const startAttendanceSession = () => {
    if (!startTime || !endTime) {
      alert("Please set both start and end times");
      return;
    }
    setSessionActive(true);
    // In a real app, this would call an API to start the session
  };

  // End attendance session
  const endAttendanceSession = () => {
    setSessionActive(false);
    // In a real app, this would call an API to end the session
  };

  // Toggle student status (for demo purposes)
  const toggleStudentStatus = (id) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          const newStatus = student.status === "Present" ? "Absent" : "Present";
          return { ...student, status: newStatus };
        }
        return student;
      })
    );
  };

  // Calculate attendance statistics
  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;
  const absentCount = students.length - presentCount;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-xl font-bold text-gray-900">Attendance System</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row gap-4 max-w-7xl w-full mx-auto p-4">
        {/* Left Panel - Attendance Controls */}
        <div className="bg-white shadow rounded-lg p-4 md:w-1/3">
          <h2 className="text-lg mb-4">Attendance Session</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Current Time</p>
            <p className="text-lg">{currentTime}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={sessionActive}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={sessionActive}
              />
            </div>

            {!sessionActive ? (
              <button
                onClick={startAttendanceSession}
                className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Attendance Session
              </button>
            ) : (
              <button
                onClick={endAttendanceSession}
                className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                End Attendance Session
              </button>
            )}
          </div>

          {/* Simple Attendance Stats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-md mb-3">Attendance Count</h3>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <UserCheck className="text-green-600" size={18} />
                </div>
                <p className="text-xl font-bold text-green-600">
                  {presentCount}
                </p>
                <p className="text-xs text-gray-500">Present</p>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <UserX className="text-red-600" size={18} />
                </div>
                <p className="text-xl font-bold text-red-600">{absentCount}</p>
                <p className="text-xs text-gray-500">Absent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Simplified Student List */}
        <div className="bg-white shadow rounded-lg p-4 md:w-2/3">
          <h2 className="text-lg mb-4">Student Attendance</h2>

          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Student
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={student.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-900">
                            {student.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          student.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleStudentStatus(student.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Change
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

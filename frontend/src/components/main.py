

def input_marks():
    marks = []
    for i in range(1, 6):
        while True:
            try:
                mark = float(input(f"Enter marks for unit {i}: "))
                if 0 <= mark <= 100:
                    marks.append(mark)
                    break
                else:
                    print("Marks should be between 0 and 100. Please try again.")
            except ValueError:
                print("Invalid input. Please enter a number.")
    return marks

def compute_average(marks):
    return sum(marks) / len(marks)

def determine_grade(average):
    if 75 <= average <= 100:
        return 'Distinction'
    elif 65 <= average <= 74:
        return 'Credit'
    elif 50 <= average <= 64:
        return 'Pass'
    else:
        return 'Fail'

def main():
    students = []
    
    num_students = int(input("Enter the number of students: "))
    
    for i in range(num_students):
        print(f"\nEntering marks for student {i + 1}:")
        name = input("Enter student's name: ")
        marks = input_marks()
        average = compute_average(marks)
        grade = determine_grade(average)
        students.append((name, average, grade))
    
    students_sorted = sorted(students, key=lambda x: x[1], reverse=True)
   
    print("\nOrder of Merit:")
    for index, (name, average, grade) in enumerate(students_sorted, start=1):
        print(f"{index}. {name} - Average Marks: {average:.2f} - Grade: {grade}")


if __name__ == "__main__":
    main()

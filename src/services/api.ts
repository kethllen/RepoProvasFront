import axios from "axios";
import { FormData } from "../components/AuthForm";

const BASE_URL = process.env.REACT_APP_BACK_URL;

function createConfig(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}
async function getAllCategories(token: string) {
    const config = createConfig(token)
  
  
    const categories = await axios.get(`${BASE_URL}/category`, config)
  
    return categories.data
  }
  
async function getAllTerms(token: string) {
    const config = createConfig(token)
  
    const term = await axios.get(`${BASE_URL}/term`, config)
  
    return term.data
  }
  
async function getAllTeachers(token: string) {
    const config = createConfig(token)
  
    const teachers = await axios.get(`${BASE_URL}/teacher`, config)
  
    return teachers.data
  }
  
async function getAllTests(token: string) {
    const config = createConfig(token)
  
    const tests = await axios.get(`${BASE_URL}/test`, config)
  
    return tests.data
  }
  
async function getAllDisciplines(token: string) {
    const config = createConfig(token)
  
    const data = await axios.get(`${BASE_URL}/discipline`, config)
  
    return data.data
  }
export async function signUp(formData: FormData) {
    try {
        await axios.post(`${BASE_URL}/sign-up`, formData);
        return true;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function signIn(formData: FormData) {
    try {
        const promise = await axios.post(`${BASE_URL}/sign-in`, formData);
        return promise.data;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function disciplineData(token: string) {

    const categories: any[] = await getAllCategories(token)
    const terms: any[] = await getAllTerms(token)
    const teachers: any[] = await getAllTeachers(token)
    const data = terms.map(term => {
      return {
        termId: term.id,
        termNumber: term.number,
        disciplines: term.disciplines.map((discipline: any) => {
          return {
            disciplineId: discipline.id,
            disciplineName: discipline.name,
            teacherDisciplines: discipline.teacherDisciplines.map((teacherDiscipline: any) => {
              return {
                categories: categories.map(category => {
                  return {
                    categoryId: category.id,
                    categoryName: category.name,
                    tests: category.tests.filter((test: any) =>
                      test.teacherDisciplineId === teacherDiscipline.id).map((test: any) => {
                        return {
                          testId: test.id,
                          testName: test.name,
                          testPDFUrl: test.pdfUrl,
                          teacher: teachers.filter(teacher => teacher.id === teacherDiscipline.teacherId)
                        }
                      })
                  }
                })
              }
            })
          }
        })
      }
    })
    return data
  }
  
  
  export async function teachersData(token: string) {

    const categories: any[] = await getAllCategories(token)
  
    const teachers: any[] = await getAllTeachers(token)
  
    const disciplines: any[] = await getAllDisciplines(token)
  
    const data = teachers.map(teacher => {
  
      const tests = teacher.teacherDisciplines?.map((teachersDiscipline: any) => {
        return categories.reduce(function (result: any[], category: any) {
  
          const tests = category.tests.filter((test: any) => test.teacherDisciplineId === teachersDiscipline.id)
  
          if (tests.length !== 0) {
            const newObject = {
              categoryId: category.id,
              categoryName: category.name,
              tests: tests
            }
            result.push(newObject)
          }
          return result
        }, [])
      }).reduce((a: any, b: any) => [...a, ...b], [])
  
      return {
        teacherId: teacher.id,
        teacherName: teacher.name,
        categories: categories.map((category: any) => {
          return {
            categoryId: category.id,
            categoryName: category.name,
            tests: [...tests.filter((test: any) =>
              test.categoryId === category.id).map((el: any) =>
                el.tests)].reduce((a: any, b: any) =>
                  [...a, ...b], []).map((el: any) => {
                    return {
                      testName: el.name,
                      testId: el.id,
                      testPdfUrl: el.pdfUrl,
                      testDisciplineId: el.teacherDiscipline.disciplineId,
                      testDisciplineName: disciplines.find((discipline: any) => discipline.id === el.teacherDiscipline.disciplineId).name
                    }
                  })
          }
        })
      }
    })
    return data
  }


import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Category from '../Category';
import Teacher from '../Teacher';
import TestTeacher  from '../TestTeacher';

const styleList ={
  width: '100%', 
  maxWidth: "none", 
  bgcolor: 'background.paper'
}

export default function Teachers({ repository }: any) {
  console.log(repository)
  return (
    <List
      sx={styleList}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {repository.map((teacher: any, id: any) =>
        <Teacher
          key={`teacher_${id}`}
          name={teacher.teacherName}
        >
          {teacher.categories.map((category: any, id: any) =>
            <Category key={`category_teacher_${id}`} name={category.categoryName}>
              {category.tests.map((test: any, id: any) =>
                <TestTeacher
                  key={`test_teacher_${id}`}
                  name={test.testName}
                  url={test.testPdfUrl}
                  discipline={test.testDisciplineName}
                />
              )}
            </Category>)
          }
        </Teacher>)
      }
      <Divider></Divider>
    </List>
  )

}
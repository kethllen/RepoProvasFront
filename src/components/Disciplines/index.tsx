import * as React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Term from '../Term';
import  Discipline from '../Discipline';
import  Category  from '../Category';
import  Test from '../Test';

const styleList ={
  width: '100%', 
  maxWidth: "none", 
  bgcolor: 'background.paper'
}

export default function Disciplines({ repository }: any) {
 
  return (
    <List
      sx={styleList}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {repository.map((term: any, id: any) =>
        <Term
          key={`term_${id}`}
          name={term.termNumber}
        >
          {term.disciplines.map((discipline: any, id: any) =>
            <Discipline
              key={`discipline_${id}`}
              name={discipline.disciplineName}
            >
              {discipline.teacherDisciplines[0].categories.map((category: any, id: any) =>
                <Category
                  key={`category_${id}`}
                  name={category.categoryName}
                >
                  {category.tests.map((test: any, id: any) =>
                    <Test
                      key={`test_${id}`}
                      name={test.testName}
                      url={test.testPDFUrl}
                      teacher={test.teacher[0]}
                    />)}
                </Category>)
              }
            </Discipline>)}
        </Term>)
      }
      <Divider></Divider>
    </List>
  )

}
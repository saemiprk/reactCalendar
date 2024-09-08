### Calendar 

React + TypeScript + Vite 를 사용해 일정(Calendar) 앱을 만들었습니다.

Calendar는 DayPicker 라이브러리를 활용하였습니다. (URL : https://daypicker.dev/)

기능은 To do list와 동일하게 구현하였으며, 추가, 삭제, 수정, 조회(CRUD) 로 구성되어 있습니다.

상태 관리 시 useState, useReducer 등 React에서 제공하는 Hooks을 사용하였습니다.

DB는 웹 브라우저의 기본적으로 내장되어 있는 DB인 Web Storage를 활용하여 제작 하였습니다.

To do list에서는 다르게 Tailwind CSS를 사용하여 스타일을 구현하였습니다.

#### 실행방법
URL : 

#### Components
경로 : src/components

- Calendar
    
    달력을 보여주는 컴포넌트 입니다.
    - 날짜를 선택하지 않을 경우에는 현재 날짜의 일정 리스트를 가져오도록 구현.
    - 웹 스토리지에 저장된 리스트를 filter를 활용해 날짜별로 일정을 가져올 수 있도록 구현.

- Editor
    
    일정을 추가하는 컴포넌트 입니다.
    - 추가 시 기본으로 New Todo라고 하는 일정이 추가 되도록 구현.

- List
    
    일정 목록을 보여주는 컴포넌트 입니다.

- ListItem
    
    일정의 개별 컴포넌트 입니다.
    - 수정, 삭제 구현
    - 수정 클릭 시 입력창(input)으로 변경 되고 Edit버튼이 Check 버튼으로 변경 될 수 있도록 구현.
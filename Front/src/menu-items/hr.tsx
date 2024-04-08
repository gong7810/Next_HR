// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  IconApps,
  IconUserCheck,
  IconClockPlay,
  IconCoin,
  IconPencil,
  IconUsers,
  IconListCheck,
  IconCar,
  IconSend,
  IconEyeCheck,
  IconCoins,
  IconCoinBitcoin,
  IconBrandSamsungpass,
  IconBrandAndroid
} from '@tabler/icons';
import { NavItemType } from 'types';

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const hr: NavItemType = {
  id: 'hr',
  title: <FormattedMessage id="hr" />,
  icon: IconApps,
  type: 'group',
  children: [
    {
      id: 'baseManagement',
      title: <FormattedMessage id="baseManagement" />,
      type: 'collapse',
      icon: IconPencil,
      children: [
        {
          id: 'holidayManagement',
          title: <FormattedMessage id="holidayManagement" />,
          type: 'item',
          url: '/hr/base/Holiday/HolidayPage'
        },
        {
          id: 'departmentManagement',
          title: <FormattedMessage id="departmentManagement" />,
          type: 'item',
          url: '/hr/base/Department/DepartmentManage'
        },
        {
          id: 'positionManagement',
          title: <FormattedMessage id="positionManagement" />,
          type: 'item',
          url: '/hr/base/Position/PositionPage'
        },
        {
          id: 'baseWorkTimeManagement',
          title: <FormattedMessage id="baseWorkTimeManagement" />,
          type: 'item',
          url: '/hr/base/BaseWorkTime/WorkTimePage'
        }
      ]
    },
    {
      id: 'hrSystemManagement',
      title: <FormattedMessage id="hrSystemManagement" />,
      type: 'collapse',
      icon: IconBrandAndroid,
      children: [
        {
          id: 'authorityManagement',
          title: <FormattedMessage id="authorityManagement" />,
          type: 'item',
          url: '/hr/base/HrSystem/AuthorityInfoPage'
        },
        {
          id: 'codeManagement',
          title: <FormattedMessage id="codeManagement" />,
          type: 'item',
          url: '/hr/base/HrSystem/CodeInfoPage'
        }
      ]
    },
    {
      id: 'hrManagement',
      title: <FormattedMessage id="hrManagement" />,
      type: 'collapse',
      icon: IconUserCheck,
      children: [
        {
          id: 'employeeManagement',
          title: <FormattedMessage id="employeeManagement" />,
          type: 'collapse',
          icon: IconUsers,
          children: [
            {
              id: 'employeeRegist',
              title: <FormattedMessage id="employeeRegist" />,
              type: 'item',
              url: '/hr/empManagement/registerEmp',
              breadcrumbs: false
            },
            {
              id: 'employeeInfo',
              title: <FormattedMessage id="employeeInfo" />,
              type: 'item',
              url: '/hr/empManagement/empInfo',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'performanceEvaluationManagement',
          title: <FormattedMessage id="performanceEvaluationManagement" />,
          type: 'collapse',
          icon: IconListCheck,
          children: [
            {
              id: 'performanceEvaluationRegist',
              title: <FormattedMessage id="performanceEvaluationRegist" />,
              type: 'item',
              url: '/hr/empManagement/empEvaluation',
              breadcrumbs: false
            },
            {
              id: 'performanceEvaluationApproval',
              title: <FormattedMessage id="performanceEvaluationApproval" />,
              type: 'item',
              url: '/hr/empManagement/empEvaluationManagement',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'personnelAppointmentManagement',
          title: <FormattedMessage id="personnelAppointmentManagement" />,
          type: 'collapse',
          icon: IconCar,
          children: [
            {
              id: 'personnelAppointmentRegist',
              title: <FormattedMessage id="personnelAppointmentRegist" />,
              type: 'item',
              url: '/hr/empManagement/empAppointmentRegist',
              breadcrumbs: false
            },
            {
              id: 'personnelAppointmentInfo',
              title: <FormattedMessage id="personnelAppointmentInfo" />,
              type: 'item',
              url: '/hr/empManagement/empAppointmentManagement',
              breadcrumbs: false
            }
          ]
        }
      ]
    },
    {
      id: 'attendanceManagement',
      title: <FormattedMessage id="attendanceManagement" />,
      type: 'collapse',
      icon: IconClockPlay,
      children: [
        {
          id: 'attendanceRegist',
          title: <FormattedMessage id="attendanceRegist" />,
          type: 'collapse',
          icon: IconSend,
          children: [
            {
              id: 'dayAttendance',
              title: <FormattedMessage id="dayAttendance" />,
              type: 'item',
              url: '/hr/attendance/DailyAttdRegistration/DailyAttdRegistPage'
            },
            {
              id: 'restAttendanceRegist',
              title: <FormattedMessage id="restAttendanceRegist" />,
              type: 'item',
              url: '/hr/attendance/RestAttendance/RestAttdRegistPage'
            },
            {
              id: 'breakAttendanceRegist',
              title: <FormattedMessage id="breakAttendanceRegist" />,
              type: 'item',
              url: '/hr/attendance/BreakAttendance/BreakAttdRegistPage'
            },
            {
              id: 'businessRegist',
              title: <FormattedMessage id="businessRegist" />,
              type: 'item',
              url: '/hr/attendance/RestAttendance/BusinessRegistPage'
            },
            {
              id: 'overtimeRegist',
              title: <FormattedMessage id="overtimeRegist" />,
              type: 'item',
              url: '/hr/attendance/RestAttendance/OvertimeRegistPage'
            }
          ]
        },
        {
          id: 'attendanceApproval',
          title: <FormattedMessage id="attendanceApproval" />,
          type: 'collapse',
          icon: IconEyeCheck,
          children: [
            {
              id: 'dayAttendanceManagement',
              title: <FormattedMessage id="dayAttendanceManagement" />,
              type: 'item',
              url: '/hr/attendance/DailyAttdManage/DailyAttdManagePage'
            },
            {
              id: 'monthAttendanceManagement',
              title: <FormattedMessage id="monthAttendanceManagement" />,
              type: 'item',
              url: '/app/e-commerce/product-details/1'
            },
            {
              id: 'restAttendanceApprovalManagement',
              title: <FormattedMessage id="restAttendanceApprovalManagement" />,
              type: 'item',
              url: '/hr/attendance/RestAttendance/RestAttdApprovalPage'
            },
            {
              id: 'breakAttendanceManagement',
              title: <FormattedMessage id="breakAttendanceManagement" />,
              type: 'item',
              url: '/hr/attendance/BreakAttendance/BreakAttdManagePage'
            }
          ]
        }
      ]
    },
    {
      id: 'salaryManagement',
      title: <FormattedMessage id="salaryManagement" />,
      type: 'collapse',
      icon: IconCoins,
      children: [
        {
          id: 'salaryInfo',
          title: <FormattedMessage id="salaryInfo" />,
          type: 'collapse',
          icon: IconCoin,
          children: [
            {
              id: 'monthSalaryInfo',
              title: <FormattedMessage id="monthSalaryInfo" />,
              type: 'item',
              url: '/hr/salary/SalaryManagement/MonthSalaryPage'
            },
            {
              id: 'bonusInfo',
              title: <FormattedMessage id="bonusInfo" />,
              type: 'item',
              url: '/hr/salary/SalaryManagement/SalaryAwardsPage'
            },
            {
              id: 'severancePayInfo',
              title: <FormattedMessage id="severancePayInfo" />,
              type: 'item',
              url: '/hr/salary/SalaryManagement/SeverancePayPage'
            }
          ]
        },
        {
          id: 'salaryRegist',
          title: <FormattedMessage id="salaryRegist" />,
          type: 'collapse',
          icon: IconCoinBitcoin,
          children: [
            {
              id: 'monthSalaryRegist',
              title: <FormattedMessage id="monthSalaryRegist" />,
              type: 'item',
              url: '/hr/salary/SalaryRegist/MonthSalaryRegistPage'
            },
            {
              id: 'bonusRegist',
              title: <FormattedMessage id="bonusRegist" />,
              type: 'item',
              url: '/hr/salary/SalaryRegist/SalaryAwardRegistPage'
            },
            {
              id: 'severancePayRegist',
              title: <FormattedMessage id="severancePayRegist" />,
              type: 'item',
              url: '/hr/salary/SalaryRegist/SeverancePayRegistPage'
            }
          ]
        },
        {
          id: 'salaryBaseInfoManagement',
          title: <FormattedMessage id="salaryBaseInfoManagement" />,
          type: 'collapse',
          icon: IconBrandSamsungpass,
          children: [
            {
              id: 'salaryBaseManagement',
              title: <FormattedMessage id="salaryBaseManagement" />,
              type: 'item',
              url: '/hr/salary/SalaryBaseInfoManagement/BaseSalaryManagePage'
            },
            {
              id: 'overtimePayManagement',
              title: <FormattedMessage id="overtimePayManagement" />,
              type: 'item',
              url: '/hr/salary/SalaryBaseInfoManagement/BaseExtSalManagePage'
            },
            {
              id: 'socialInsuranceManagement',
              title: <FormattedMessage id="socialInsuranceManagement" />,
              type: 'item',
              url: '/hr/salary/SalaryBaseInfoManagement/SocialInsurePage'
            }
          ]
        }
      ]
    }
    // {
    //   id: 'customer',
    //   title: <FormattedMessage id="인적자원개발 관리" />,
    //   type: 'collapse',
    //   icon: IconBasket,
    //   children: [
    //     {
    //       id: 'customer-list',
    //       title: <FormattedMessage id="인력계획" />,
    //       type: 'item',
    //       url: '/app/customer/customer-list',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'order-list',
    //       title: <FormattedMessage id="교육훈련진행관리" />,
    //       type: 'item',
    //       url: '/app/customer/order-list',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'create-invoice',
    //       title: <FormattedMessage id="채용승인" />,
    //       type: 'item',
    //       url: '/app/customer/create-invoice',
    //       breadcrumbs: false
    //     }
    //   ]
    // },
    // {
    //   id: 'customer',
    //   title: <FormattedMessage id="인적자원정보 관리" />,
    //   type: 'collapse',
    //   icon: IconBasket,
    //   children: [
    //     {
    //       id: 'customer-list',
    //       title: <FormattedMessage id="이력서조회" />,
    //       type: 'item',
    //       url: '/app/customer/customer-list',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'order-list',
    //       title: <FormattedMessage id="인성검사/면접결과" />,
    //       type: 'item',
    //       url: '/app/customer/order-list',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'create-invoice',
    //       title: <FormattedMessage id="선발결정" />,
    //       type: 'item',
    //       url: '/app/customer/create-invoice',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default hr;

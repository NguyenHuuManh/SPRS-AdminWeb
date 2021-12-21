import React from 'react';
import { FaChartBar } from 'react-icons/fa';



const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Tổng quan',
    to: '/',
    icon: <FaChartBar style={{ marginRight: 10 }} />,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý tài khoản',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Yêu cầu đăng ký',
        to: '/quan-ly-org',
      },

    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý thông báo',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách thông báo',
        to: '/quan-ly-thong-bao',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tạo thông báo',
        to: '/gui-thong-bao',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Phân quyền',
    to: '/phan-quyen',
    icon: 'cil-bell',
  },
]


export const _nav_ORK = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Tổng quan',
    to: '/',
    icon: <FaChartBar style={{ marginRight: 10 }} />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý thành viên',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tạo tài khoản thành viên',
        to: '/register-member',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách thành viên',
        to: '/quan-ly-user',
      },
    ],
  },
]

export default _nav;

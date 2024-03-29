import { gql } from '@apollo/client';

export const AdminSignup = gql`
mutation createAdmin($createAdminArgs: CreateAdminArgs!) {
  createAdmin(createAdminArgs: $createAdminArgs) {
    id
    emailAddress
    password
    firstName
    lastName
    userPosition
    createdAt
  }
}
`;

export const UserSignup = gql`
mutation CreateUser($createUserArgs: CreateUserArgs!) {
  createUser(createUserArgs: $createUserArgs) {
    id
    emailAddress
    firstName
    lastName
    password
    userPosition
    createdAt
  }
}
`;

export const UserLogin = gql`
mutation LoginUser($loginUserArgs: LoginUserArgs!) {
  loginUser(loginUserArgs: $loginUserArgs) {
    id
    emailAddress
    password
    firstName
    lastName
    userPosition
    createdAt
  }
}
`;

export const findAllUser = gql`
mutation findAllUser($userId: Float!) {
  findAllUser(userId: $userId) {
    id
    emailAddress
    password
    firstName
    lastName
    userPosition
    createdAt
  }
}
`;

export const UpdateUser = gql`
mutation UpdateUser($userId: Float!, $adminUserId: Float!) {
  updateUser(userId: $userId, adminUserId: $adminUserId) {
    id
    emailAddress
    password
    firstName
    lastName
    userPosition
    createdAt
  }
}
`;

export const CreateCategory = gql`
mutation createCategory($createCategoryArgs: CreateCategoryArgs!, $adminUserId: Float!) {
  createCategory(createCategoryArgs: $createCategoryArgs, adminUserId: $adminUserId) {
    id
    category_name
    category_status
    createdAt
  }
}
`;

export const AllCategory = gql`
mutation FindAllCategory {
  findAllCategory {
    id
    category_name
    category_status
    createdAt
  }
}
`;

export const UpdateCategory = gql`
mutation UpdateCategory($categoryId: Float!, $adminUserId: Float!) {
  updateCategory(categoryId: $categoryId, adminUserId: $adminUserId) {
    id
    category_name
    category_status
    createdAt
  }
}
`;

export const CreateTicket = gql`
mutation CreateTicket($createTicketArgs: CreateTicketArgs!) {
  createTicket(createTicketArgs: $createTicketArgs) {
    id
    title
    priority
    message
    status
    createdAt
    user_id
    ticket_id
    duration
    category {
      id
      category_name
      category_status
      createdAt
    }
  }
}
`;

export const GetAllTicketsBySingleUser = gql`
mutation GetAllTicketsBySingleUser($userId: Float!) {
  getAllTicketsBySingleUser(userId: $userId) {
    id
    title
    priority
    message
    status
    user_id
    createdAt
    ticket_id
    duration
    category {
      id
      category_name
      category_status
      createdAt
    }
  }
}
`;

export const GetFindSingleTicket = gql`
mutation FindSingleTicket($findSingleTicketId: Float!, $userId: Float!) {
  findSingleTicket(id: $findSingleTicketId, userId: $userId) {
    id
    title
    priority
    message
    status
    user_id
    createdAt
    ticket_id
    duration
    category {
      id
      category_name
      category_status
      createdAt
    }
  }
}
`;

export const updateStatusClosed = gql`
mutation updateStatusClosed($ticketId: Float!) {
  updateStatusClosed(ticketId: $ticketId) {
    id
    title
    priority
    message
    status
    user_id
    createdAt
    ticket_id
    duration
    category {
      id
      category_name
      category_status
      createdAt
    }
  }
}
`;


export const GetAllClosedTicketsBySingleUser = gql`
query GetAllClosedTicketsBySingleUser($userId: Float!) {
  getAllClosedTicketsBySingleUser(userId: $userId) {
    id
    title
    priority
    message
    status
    user_id
    createdAt
    ticket_id
    duration
    category {
      id
      category_name
      category_status
      createdAt
    }
  }
}
`;

export const GetAllClosedTickets = gql`
query GetAllClosedTickets($adminUserId: Float!) {
  getAllClosedTickets(adminUserId: $adminUserId) {
    id
    title
    priority
    message
    status
    user_id
    createdAt
    ticket_id
    duration
    category {
      id
      category_name
      category_status
      createdAt
    }
  }
}
`;


export const getAllOpenedTickets = gql`
mutation getAllOpenedTickets($adminUserId: Float!) {
  getAllOpenedTickets(adminUserId: $adminUserId) {
    id
    title
    priority
    ticket_id
    message
    status
    user_id
    duration
    category {
      id
      category_name
      category_status
      createdAt
    }
    createdAt
  }
}
`;

export const CreateTicketReply = gql`
mutation CreateTicketReply($createTicketReplyArgs: CreateTicketReplyArgs!) {
  createTicketReply(createTicketReplyArgs: $createTicketReplyArgs) {
    id
    message
    createdAt
    replied_by {
      id
      firstName
      lastName
      emailAddress
      password
      userPosition
      createdAt
    }
    ticket {
      createdAt
      id
      message
      priority
      status
      ticket_id
      title
      user_id
      duration
    }
  }
}
`;

export const GetAllRepliesBySingleTicket = gql`
mutation GetAllRepliesBySingleTicket($ticketId: Float!) {
  getAllRepliesBySingleTicket(ticketId: $ticketId) {
    id
    message
    createdAt
    replied_by {
      id
      firstName
      lastName
      emailAddress
      password
      userPosition
      createdAt
    }
    ticket {
      createdAt
      id
      message
      priority
      status
      ticket_id
      title
      user_id
      duration
    }
  }
}
`;

export const AdminReadSingleTicket = gql`
mutation AdminReadSingleTicket($adminReadSingleTicketId: Float!) {
  adminReadSingleTicket(id: $adminReadSingleTicketId) {
    id
    title
    priority
    ticket_id
    message
    status
    user_id
    duration
    category {
      id
      category_name
      category_status
      createdAt
    }
    createdAt
  }
}
`;

export const FindAllUserAmount = gql`
mutation FindAllUserAmount {
  findAllUserAmount {
    id
    order_id
    amount
    user {
      id
      emailAddress
      password
      firstName
      lastName
      userPosition
      createdAt
    }
    createdAt
  }
}
`;

export const CreateTags = gql`
mutation CreateTags($createTagsArgs: CreateTagsArgs!, $adminUserId: Float!) {
  createTags(createTagsArgs: $createTagsArgs, adminUserId: $adminUserId) {
    id
    tag_name
    createdAt
    tag_description
  }
}
`;

export const GetAllTags = gql`
mutation GetAllTags {
  getAllTags {
    id
    tag_name
    tag_description
    createdAt
  }
}
`;

export const FindSingleTag = gql`
mutation FindSingleTag($tagName: String!) {
  findSingleTag(tagName: $tagName) {
    id
    tag_name
    tag_description
    createdAt
  }
}
`;

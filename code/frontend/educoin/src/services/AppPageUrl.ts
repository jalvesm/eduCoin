enum PRIVATE_PAGES_URL {
    ALUNO = "/aluno",
    EMPRESA = "/empresa",
    PROFESSOR = "/professor",
}

enum PUBLIC_PAGES_URL {
    INDEX = "/",
    SIGNUP_TEACHER = "/cadastro-professor",
    SIGNUP_STUDENT = "/cadastro-aluno",
    SIGNUP_ENTERPRISE = "/cadastro--empresa",
    NOT_FOUND ="*"
}

export { PRIVATE_PAGES_URL, PUBLIC_PAGES_URL };
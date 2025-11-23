import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Fallback } from "./components/fallback";
import { Loading } from "./components/loading";
import { Layout } from "./components/layout";
import { NotFound } from "./pages/not-found";
import { Home } from "./pages/home";
import { Tarefas } from "./pages/tarefas";
import { Cadastro } from "./pages/cadastro";
import { Login } from "./pages/login";

import { useAuth, AuthProvider } from "./context/auth-context";
import { AddTarefa } from "./pages/add-tarefas";
import { AddProjetos } from "./pages/add-projetos";
import { ProjetosPessoais } from "./pages/projetos-pessoais";
import { MetaPage } from "./pages/meta";
import { Dashboard } from "./pages/dashboard";
import { Contato } from './pages/contato';
import { Integrantes } from './pages/integrantes';
import { FAQ } from './pages/faq';
import { Sobre } from './pages/sobre';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Suspense fallback={<Loading />}>
            <Routes>

              {/* TELAS LIVRES */}
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />

              {/* ROTAS PROTEGIDAS */}
              <Route path="/" element={<Layout />}>

                <Route
                  index
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="tarefas"
                  element={
                    <PrivateRoute>
                      <Tarefas />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="add-tarefas"
                  element={
                    <PrivateRoute>
                      <AddTarefa />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="projetos-pessoais"
                  element={
                    <PrivateRoute>
                      <ProjetosPessoais />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="add-projetos"
                  element={
                    <PrivateRoute>
                      <AddProjetos />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="meta"
                  element={
                    <PrivateRoute>
                      <MetaPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="contato"
                  element={
                    <PrivateRoute>
                      <Contato />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="integrantes"
                  element={
                    <PrivateRoute>
                      <Integrantes />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="faq"
                  element={
                    <PrivateRoute>
                      <FAQ />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="sobre"
                  element={
                    <PrivateRoute>
                      <Sobre />
                    </PrivateRoute>
                  }
                />

                {/* NOT FOUND */}
                <Route path="*" element={<NotFound />} />
              </Route>

            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

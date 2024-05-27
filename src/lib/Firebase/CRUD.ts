
import { collection, addDoc, deleteDoc, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';


type createDocumentProps = {
  userId: string;
  productName: string;
  link: string;
  category: ['sala', 'cozinha', 'banheiro', 'quarto', 'enxoval', 'outros'];
  status1: ['imported', 'urgent']
  status2: ['imported', 'urgent']
  price: number;
};


// Adicione um documento
export async function createDocument(data: createDocumentProps) {
  try {
    const docRef = await addDoc(collection(db, 'users'), data);
    console.log('Documento adicionado com ID: ', docRef.id);
  } catch (error) {
    console.error('Erro ao adicionar documento: ', error);
  }
}

// Busca um documento
export async function getDocument(documentId: string) {
  try {
    const docSnap = await getDoc(doc(db, 'users', documentId));
    if (docSnap.exists()) {
      console.log('Dados do documento: ', docSnap.data());
    } else {
      console.log('Documento não encontrado!');
    }
  } catch (error) {
    console.error('Erro ao obter documento: ', error);
  }
}

// Obter todos os documentos
export async function getAllDocuments() {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.error('Erro ao obter todos os documentos: ', error);
  }
}

// Atualize um documento
export async function updateDocument(documentId: string, newData: createDocumentProps) {
  try {
    await updateDoc(doc(db, 'users', documentId), newData);
    console.log('Documento atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar documento: ', error);
  }
}

// Exclua um documento
export async function deleteDocument(documentId: string) {
  try {
    await deleteDoc(doc(db, 'users', documentId));
    console.log('Documento excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir documento: ', error);
  }
}
